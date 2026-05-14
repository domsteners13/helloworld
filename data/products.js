// Two product feeds. In production swap fetchTrendingProducts() for the real
// TikTok Shop / Creator Marketplace API call (see README.md).

// Product photos come from loremflickr.com (real Flickr photos by keyword).
// Swap any image with your own product photo URL when you have real shots.
const productImg = (keywords, seed, w = 600, h = 600) =>
  `https://loremflickr.com/${w}/${h}/${keywords}?lock=${encodeURIComponent(seed)}`;

const catImg = (seed, w = 600, h = 600) =>
  `https://cataas.com/cat?width=${w}&height=${h}&random=${encodeURIComponent(seed)}`;

// Products YOU sell. These get a priority boost in ranking.
window.MY_PRODUCTS = [
  {
    id: "mine-001",
    title: "Mochi the Tabby Sticker Pack",
    desc: "12 die-cut vinyl stickers of our shop mascot.",
    price: 8.99,
    image: productImg("stickers,vinyl", "mine-001"),
    mine: true,
    tags: ["stickers", "cute", "gift"],
  },
  {
    id: "mine-002",
    title: "Cat Loaf Beanie",
    desc: "Soft knit hat with kitty ears. One size fits most.",
    price: 22.0,
    image: productImg("beanie,knit-hat", "mine-002"),
    mine: true,
    tags: ["apparel", "winter"],
  },
  {
    id: "mine-003",
    title: "Whiskers Enamel Pin",
    desc: "Hard enamel, gold-plated. Pin your love for cats.",
    price: 11.5,
    image: productImg("enamel,pin,badge", "mine-003"),
    mine: true,
    tags: ["accessory", "gift"],
  },
  {
    id: "mine-004",
    title: "Purrfect Picks Tote",
    desc: "Heavy canvas tote printed with 9 of our cat regulars.",
    price: 18.0,
    image: productImg("tote,canvas,bag", "mine-004"),
    mine: true,
    tags: ["bag", "apparel"],
  },
  {
    id: "mine-005",
    title: "Catnip Plush Trio",
    desc: "Three hand-stitched plushies stuffed with organic catnip.",
    // Genuinely a cat-themed product — keep a kitten photo here.
    image: catImg("catnip-plush"),
    price: 14.99,
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
      image: productImg("lamp,nightlight", "tk-101"),
      trendScore: 92 + jitter(),
      tags: ["home", "gadget"],
    },
    {
      id: "tk-102",
      title: "Self-Cleaning Litter Scoop",
      desc: "Viral on #CatTok. Sifts in one motion.",
      price: 24.5,
      image: productImg("scoop,plastic,tool", "tk-102"),
      trendScore: 88 + jitter(),
      tags: ["pet", "tool"],
    },
    {
      id: "tk-103",
      title: "Cat Tunnel Mega Pack",
      desc: "3-piece collapsible tunnel set with crinkle lining.",
      price: 32.0,
      image: productImg("tunnel,pet,toy", "tk-103"),
      trendScore: 85 + jitter(),
      tags: ["pet", "toy"],
    },
    {
      id: "tk-104",
      title: "Feline Facial Mist",
      desc: "Silly trend, real product. Cucumber + chamomile.",
      price: 12.0,
      image: productImg("spray,bottle,cosmetic", "tk-104"),
      trendScore: 80 + jitter(),
      tags: ["pet", "wellness"],
    },
    {
      id: "tk-105",
      title: "Tiny Cat Astronaut Helmet",
      desc: "Photo prop. Do not actually launch your cat.",
      price: 27.0,
      image: productImg("helmet,astronaut", "tk-105"),
      trendScore: 78 + jitter(),
      tags: ["costume", "photo"],
    },
    {
      id: "tk-106",
      title: "Laser Pointer Robot",
      desc: "Auto-roaming. Keeps cats entertained for hours.",
      price: 36.99,
      image: productImg("laser,gadget,robot", "tk-106"),
      trendScore: 75 + jitter(),
      tags: ["pet", "gadget"],
    },
    {
      id: "tk-107",
      title: "Cat Loaf Mug",
      desc: "Heat-reactive ceramic. Mug warms, cat appears.",
      price: 16.0,
      image: productImg("mug,ceramic,coffee", "tk-107"),
      trendScore: 70 + jitter(),
      tags: ["home", "gift"],
    },
    {
      id: "tk-108",
      title: "Window Hammock Perch",
      desc: "Suction-cup mount. Holds up to 30 lbs.",
      price: 28.0,
      // Cat-themed pet product — keep a cat photo so you see the use case.
      image: catImg("window-hammock"),
      trendScore: 68 + jitter(),
      tags: ["pet", "home"],
    },
  ];
};
