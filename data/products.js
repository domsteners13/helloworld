// Two product feeds. In production swap fetchTrendingProducts() for the real
// TikTok Shop / Creator Marketplace API call (see README.md).

const catImg = (seed, w = 600, h = 600) =>
  `https://cataas.com/cat?width=${w}&height=${h}&random=${encodeURIComponent(seed)}`;

// Products YOU sell. These get a priority boost in ranking.
window.MY_PRODUCTS = [
  {
    id: "mine-001",
    title: "Mochi the Tabby Sticker Pack",
    desc: "12 die-cut vinyl stickers of our shop mascot.",
    price: 8.99,
    image: catImg("mochi-stickers"),
    mine: true,
    tags: ["stickers", "cute", "gift"],
  },
  {
    id: "mine-002",
    title: "Cat Loaf Beanie",
    desc: "Soft knit hat with kitty ears. One size fits most.",
    price: 22.0,
    image: catImg("loaf-beanie"),
    mine: true,
    tags: ["apparel", "winter"],
  },
  {
    id: "mine-003",
    title: "Whiskers Enamel Pin",
    desc: "Hard enamel, gold-plated. Pin your love for cats.",
    price: 11.5,
    image: catImg("whiskers-pin"),
    mine: true,
    tags: ["accessory", "gift"],
  },
  {
    id: "mine-004",
    title: "Purrfect Picks Tote",
    desc: "Heavy canvas tote printed with 9 of our cat regulars.",
    price: 18.0,
    image: catImg("purrfect-tote"),
    mine: true,
    tags: ["bag", "apparel"],
  },
  {
    id: "mine-005",
    title: "Catnip Plush Trio",
    desc: "Three hand-stitched plushies stuffed with organic catnip.",
    price: 14.99,
    image: catImg("catnip-plush"),
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
      price: 19.99,
      image: catImg("nightlight-cat"),
      trendScore: 92 + jitter(),
      tags: ["home", "gadget"],
    },
    {
      id: "tk-102",
      title: "Self-Cleaning Litter Scoop",
      desc: "Viral on #CatTok. Sifts in one motion.",
      price: 24.5,
      image: catImg("litter-scoop"),
      trendScore: 88 + jitter(),
      tags: ["pet", "tool"],
    },
    {
      id: "tk-103",
      title: "Cat Tunnel Mega Pack",
      desc: "3-piece collapsible tunnel set with crinkle lining.",
      price: 32.0,
      image: catImg("cat-tunnel"),
      trendScore: 85 + jitter(),
      tags: ["pet", "toy"],
    },
    {
      id: "tk-104",
      title: "Feline Facial Mist",
      desc: "Silly trend, real product. Cucumber + chamomile.",
      price: 12.0,
      image: catImg("facial-mist"),
      trendScore: 80 + jitter(),
      tags: ["pet", "wellness"],
    },
    {
      id: "tk-105",
      title: "Tiny Cat Astronaut Helmet",
      desc: "Photo prop. Do not actually launch your cat.",
      price: 27.0,
      image: catImg("astro-helmet"),
      trendScore: 78 + jitter(),
      tags: ["costume", "photo"],
    },
    {
      id: "tk-106",
      title: "Laser Pointer Robot",
      desc: "Auto-roaming. Keeps cats entertained for hours.",
      price: 36.99,
      image: catImg("laser-robot"),
      trendScore: 75 + jitter(),
      tags: ["pet", "gadget"],
    },
    {
      id: "tk-107",
      title: "Cat Loaf Mug",
      desc: "Heat-reactive ceramic. Mug warms, cat appears.",
      price: 16.0,
      image: catImg("loaf-mug"),
      trendScore: 70 + jitter(),
      tags: ["home", "gift"],
    },
    {
      id: "tk-108",
      title: "Window Hammock Perch",
      desc: "Suction-cup mount. Holds up to 30 lbs.",
      price: 28.0,
      image: catImg("window-hammock"),
      trendScore: 68 + jitter(),
      tags: ["pet", "home"],
    },
  ];
};
