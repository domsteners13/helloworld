// Purrfect Picks — TikTok Cat Shop
// Ranking: smart score = priority boost (yours) + trend score + feedback signal.
// Feedback (likes, dislikes, buy clicks, impressions) persists in localStorage
// and feeds back into the smart score on every render.

const FEEDBACK_KEY = "pp.feedback.v1";
const PRIORITY_BOOST = 35; // baseline lift for products you sell
const LIKE_WEIGHT = 6;
const DISLIKE_WEIGHT = -10;
const BUY_WEIGHT = 12;
const IMPRESSION_DECAY = -0.4; // mild fatigue for over-shown items

const state = {
  products: [],
  trending: [],
  feedback: loadFeedback(),
  sort: "smart",
  filter: "all",
  currency: localStorage.getItem("pp.currency") || "GBP",
};

const CURRENCY_SYMBOL = { GBP: "£", EUR: "€" };

function priceOf(p) {
  return p.prices?.[state.currency] ?? 0;
}

function formatPrice(p) {
  return `${CURRENCY_SYMBOL[state.currency]}${priceOf(p).toFixed(2)}`;
}

function loadFeedback() {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || {};
  } catch {
    return {};
  }
}

function saveFeedback() {
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(state.feedback));
}

function fb(id) {
  return (state.feedback[id] ||= {
    likes: 0,
    dislikes: 0,
    buys: 0,
    impressions: 0,
    liked: false,
  });
}

function smartScore(p) {
  const f = fb(p.id);
  const base = p.trendScore ?? 50;
  const priority = p.mine ? PRIORITY_BOOST : 0;
  const signal =
    f.likes * LIKE_WEIGHT +
    f.dislikes * DISLIKE_WEIGHT +
    f.buys * BUY_WEIGHT +
    f.impressions * IMPRESSION_DECAY;
  return base + priority + signal;
}

function rank(products) {
  const list = products.slice();
  switch (state.sort) {
    case "trending":
      list.sort((a, b) => (b.trendScore ?? 0) - (a.trendScore ?? 0));
      break;
    case "liked":
      list.sort((a, b) => fb(b.id).likes - fb(a.id).likes);
      break;
    case "price-asc":
      list.sort((a, b) => priceOf(a) - priceOf(b));
      break;
    case "price-desc":
      list.sort((a, b) => priceOf(b) - priceOf(a));
      break;
    case "smart":
    default:
      list.sort((a, b) => smartScore(b) - smartScore(a));
  }
  return list;
}

function applyFilter(products) {
  if (state.filter === "mine") return products.filter((p) => p.mine);
  if (state.filter === "trending") return products.filter((p) => !p.mine);
  return products;
}

function renderCard(p) {
  const tpl = document.getElementById("card-tpl");
  const node = tpl.content.firstElementChild.cloneNode(true);
  const f = fb(p.id);

  node.dataset.id = p.id;
  node.querySelector(".card-img").src = p.image;
  node.querySelector(".card-img").alt = p.title;
  node.querySelector(".card-title").textContent = p.title;
  node.querySelector(".card-desc").textContent = p.desc;
  node.querySelector(".price").textContent = formatPrice(p);
  node.querySelector(".trend").textContent = p.trendScore
    ? `🔥 ${Math.round(p.trendScore)}`
    : "";

  const badges = node.querySelector(".badges");
  if (p.mine) badges.append(makeBadge("My shop", "mine"));
  if (p.trendScore && p.trendScore >= 80)
    badges.append(makeBadge("Trending", "trending"));
  if (smartScore(p) >= 110) badges.append(makeBadge("Top pick", "priority"));
  if (p.ukWarehouse) badges.append(makeBadge("🇬🇧 UK stock", "uk"));

  if (p.ukWarehouse) {
    const meta = document.createElement("p");
    meta.className = "uk-meta";
    meta.textContent = `Stocked in UK · ${p.ukWarehouse}`;
    node.querySelector(".card-body").insertBefore(
      meta,
      node.querySelector(".card-actions")
    );
  }

  const likeBtn = node.querySelector(".like");
  likeBtn.querySelector(".like-count").textContent = f.likes;
  if (f.liked) likeBtn.classList.add("active");
  likeBtn.addEventListener("click", () => onLike(p.id));
  node.querySelector(".dislike").addEventListener("click", () =>
    onDislike(p.id)
  );
  node.querySelector(".buy").addEventListener("click", () => onBuy(p));

  // Each render counts as one impression for the feedback loop.
  f.impressions += 1;
  return node;
}

function makeBadge(text, cls) {
  const span = document.createElement("span");
  span.className = `badge ${cls}`;
  span.textContent = text;
  return span;
}

function onLike(id) {
  const f = fb(id);
  if (f.liked) {
    f.likes = Math.max(0, f.likes - 1);
    f.liked = false;
  } else {
    f.likes += 1;
    f.liked = true;
  }
  saveFeedback();
  render();
}

function onDislike(id) {
  fb(id).dislikes += 1;
  saveFeedback();
  render();
}

function onBuy(p) {
  fb(p.id).buys += 1;
  saveFeedback();
  if (p.url) window.open(p.url, "_blank", "noopener");
  render();
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  const list = applyFilter(rank(state.products));
  document.getElementById("grid-title").textContent =
    state.filter === "mine"
      ? "My shop"
      : state.filter === "trending"
      ? "Trending on TikTok"
      : "Today's picks";
  if (!list.length) {
    grid.innerHTML = `<p style="color:var(--muted)">No products match this filter yet.</p>`;
    return;
  }
  for (const p of list) grid.appendChild(renderCard(p));
  saveFeedback(); // impressions changed during render
}

async function loadTrending() {
  const trending = await window.fetchTrendingProducts();
  state.trending = trending;
  state.products = [...window.MY_PRODUCTS, ...trending];
  render();
}

function setupFeatured() {
  const img = document.getElementById("featured-cat");
  const btn = document.getElementById("new-cat");
  // thecatapi returns curated, well-framed photos. Cataas was returning
  // unflattering crops (no face, snotty noses, etc).
  const fetchCat = async () => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg,png&t=${Date.now()}`
      );
      const [data] = await res.json();
      return data?.url;
    } catch {
      return null;
    }
  };
  const refresh = async () => {
    btn.disabled = true;
    const url = await fetchCat();
    img.src =
      url ||
      `https://cataas.com/cat/cute?width=1200&height=560&random=${Date.now()}`;
    btn.disabled = false;
  };
  refresh();
  btn.addEventListener("click", refresh);
}

function setupControls() {
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    render();
  });
  document.getElementById("filter").addEventListener("change", (e) => {
    state.filter = e.target.value;
    render();
  });
  const currencySel = document.getElementById("currency");
  currencySel.value = state.currency;
  currencySel.addEventListener("change", (e) => {
    state.currency = e.target.value;
    localStorage.setItem("pp.currency", state.currency);
    render();
  });
  document
    .getElementById("refresh-trending")
    .addEventListener("click", loadTrending);
}

setupFeatured();
setupControls();
loadTrending();
