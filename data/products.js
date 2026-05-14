// Two product feeds. In production swap fetchTrendingProducts() for the real
// TikTok Shop / Creator Marketplace API call (see README.md).

// Real product photos from Unsplash (free, hotlinkable).
// Swap any `image:` URL for your own product photo when ready.
const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
const unsplashPremium = (id, w = 600, h = 600) =>
  `https://plus.unsplash.com/premium_photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

// Until real TikTok Shop product URLs are wired up, send buyers to a TikTok
// product search for the item. Replace per-product with the real deeplink
// (e.g. https://shop.tiktok.com/view/product/<id>) when you have one.
const tiktokSearch = (q) =>
  `https://www.tiktok.com/search?q=${encodeURIComponent(q)}&type=product`;

// Products YOU sell. These get a priority boost in ranking.
window.MY_PRODUCTS = [
  {
    id: "mine-001",
    title: "Mochi the Tabby Sticker Pack",
    desc: "12 die-cut vinyl stickers of our shop mascot.",
    prices: { GBP: 6.99, EUR: 7.99 },
    image: unsplashPremium("1680626561534-079425381952"),
    url: tiktokSearch("cat sticker pack vinyl"),
    mine: true,
    tags: ["stickers", "cute", "gift"],
  },
  {
    id: "mine-002",
    title: "Cat Loaf Beanie",
    desc: "Soft knit hat with kitty ears. One size fits most.",
    prices: { GBP: 17.99, EUR: 19.99 },
    image: unsplash("1576871337632-b9aef4c17ab9"),
    url: tiktokSearch("cat ear beanie hat"),
    mine: true,
    tags: ["apparel", "winter"],
  },
  {
    id: "mine-003",
    title: "Whiskers Enamel Pin",
    desc: "Hard enamel, gold-plated. Pin your love for cats.",
    prices: { GBP: 8.99, EUR: 10.99 },
    image: unsplash("1608147152875-b0eb0c53d491"),
    url: tiktokSearch("cat enamel pin"),
    mine: true,
    tags: ["accessory", "gift"],
  },
  {
    id: "mine-004",
    title: "Purrfect Picks Tote",
    desc: "Heavy canvas tote printed with 9 of our cat regulars.",
    prices: { GBP: 14.99, EUR: 16.99 },
    image: unsplash("1574365569389-a10d488ca3fb"),
    url: tiktokSearch("cat canvas tote bag"),
    mine: true,
    tags: ["bag", "apparel"],
  },
  {
    id: "mine-005",
    title: "Catnip Plush Trio",
    desc: "Three hand-stitched plushies stuffed with organic catnip.",
    prices: { GBP: 11.99, EUR: 13.99 },
    image: unsplash("1641085809270-71f722611ce1"),
    url: tiktokSearch("catnip plush toy"),
    mine: true,
    tags: ["toy", "pet"],
  },
];

// Mock "trending on TikTok" feed. Replace with a live API call in production.
window.fetchTrendingProducts = async function fetchTrendingProducts() {
  // Simulate network jitter so the "Refresh trending" button feels real.
  await new Promise((r) => setTimeout(r, 280));
  // Shuffle trend scores a little on each call so refresh is visible.
  const jitter = () => Math.round((Math.random() * 20 - 10) * 10) / 10;
  return [
    {
      id: "tk-101",
      title: "Glow-Eye Cat Night Light",
      desc: "Color-shifting bedside lamp shaped like a sitting cat.",
      prices: { GBP: 15.99, EUR: 18.99 },
      image: unsplash("1505771215590-c5fa0aec29b8"),
      url: tiktokSearch("cat night light lamp"),
      trendScore: 92 + jitter(),
      tags: ["home", "gadget"],
    },
    {
      id: "tk-102",
      title: "Self-Cleaning Litter Scoop",
      desc: "Viral on #CatTok. Sifts in one motion.",
      prices: { GBP: 19.99, EUR: 22.99 },
      image: unsplash("1727510153658-643787acb16a"),
      url: tiktokSearch("self cleaning litter scoop"),
      trendScore: 88 + jitter(),
      tags: ["pet", "tool"],
    },
    {
      id: "tk-103",
      title: "Cat Tunnel Mega Pack",
      desc: "3-piece collapsible tunnel set with crinkle lining.",
      prices: { GBP: 24.99, EUR: 29.99 },
      image: unsplash("1742565850085-bf02c1e7cba4"),
      url: tiktokSearch("cat tunnel collapsible"),
      trendScore: 85 + jitter(),
      tags: ["pet", "toy"],
    },
    {
      id: "tk-104",
      title: "Feline Facial Mist",
      desc: "Silly trend, real product. Cucumber + chamomile.",
      prices: { GBP: 9.99, EUR: 10.99 },
      image: unsplash("1550572017-4b7a301b9d81"),
      url: tiktokSearch("cat facial mist"),
      trendScore: 80 + jitter(),
      tags: ["pet", "wellness"],
    },
    {
      id: "tk-105",
      title: "Tiny Cat Astronaut Helmet",
      desc: "Photo prop. Do not actually launch your cat.",
      prices: { GBP: 21.99, EUR: 24.99 },
      image: unsplash("1541873676-a18131494184"),
      url: tiktokSearch("cat astronaut helmet costume"),
      trendScore: 78 + jitter(),
      tags: ["costume", "photo"],
    },
    {
      id: "tk-106",
      title: "Laser Pointer Robot",
      desc: "Auto-roaming. Keeps cats entertained for hours.",
      prices: { GBP: 28.99, EUR: 33.99 },
      image: unsplash("1592194996308-7b43878e84a6"),
      url: tiktokSearch("automatic laser pointer cat toy"),
      trendScore: 75 + jitter(),
      tags: ["pet", "gadget"],
    },
    {
      id: "tk-107",
      title: "Cat Loaf Mug",
      desc: "Heat-reactive ceramic. Mug warms, cat appears.",
      prices: { GBP: 12.99, EUR: 14.99 },
      image: unsplash("1616241673111-508b4662c707"),
      url: tiktokSearch("cat ceramic mug heat reactive"),
      trendScore: 70 + jitter(),
      tags: ["home", "gift"],
    },
    {
      id: "tk-108",
      title: "Window Hammock Perch",
      desc: "Suction-cup mount. Holds up to 30 lbs.",
      prices: { GBP: 21.99, EUR: 25.99 },
      image: unsplash("1618826411640-d6df44dd3f7a"),
      url: tiktokSearch("cat window hammock perch"),
      trendScore: 68 + jitter(),
      tags: ["pet", "home"],
    },
  ];
};
