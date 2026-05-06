# Purrfect Picks 🐾

A static TikTok-style cat shop. Lots of cat photos, a feed of "trending on
TikTok" products, your own products prioritized, and a feedback loop that
re-ranks the grid as customers like, skip, and buy.

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

Cat photos come from [cataas.com](https://cataas.com) (no API key required).

## What's in here

- `index.html` — markup and product card template.
- `styles.css` — cat-themed styling.
- `data/products.js` — your products (`MY_PRODUCTS`) and a mocked
  `fetchTrendingProducts()` for the TikTok trending feed.
- `app.js` — ranking, rendering, and the feedback loop.

## Ranking model

Each product gets a `smartScore`:

```
smartScore = baseTrendScore
           + (priorityBoost if it's your product)
           + likes * 6
           + buys * 12
           + dislikes * -10
           + impressions * -0.4   // mild fatigue so the same item doesn't dominate
```

Tunable constants live at the top of `app.js`. Sorts available:

- **Smart** (default) — uses the score above.
- **Trending** — pure TikTok trend score.
- **Most loved** — by like count.
- **Price** — asc/desc.

Feedback persists in `localStorage` under `pp.feedback.v1`. Clear it with:

```js
localStorage.removeItem("pp.feedback.v1");
```

## Wiring up the real TikTok Shop API

The trending feed is mocked so the UI works offline. To use real data:

1. Register your shop at <https://partner.tiktokshop.com> and get a Seller
   API access token (or use the Affiliate / Creator API for trending data).
2. Replace `fetchTrendingProducts()` in `data/products.js` with a real call.
   Because TikTok APIs require a signed request, this typically goes through
   your own backend (don't ship a seller token in client JS):

   ```js
   window.fetchTrendingProducts = async function () {
     const res = await fetch("/api/tiktok/trending");
     return res.json(); // [{ id, title, desc, price, image, trendScore, tags }]
   };
   ```

3. For your products, swap `MY_PRODUCTS` with a fetch from your Seller catalog
   endpoint. Keep `mine: true` on each item so the priority boost applies.
4. Hook the **Buy on TikTok** button (`onBuy` in `app.js`) up to the real
   product deeplink (`https://shop.tiktok.com/view/product/<id>`).

## Tuning the priority

Increase `PRIORITY_BOOST` in `app.js` to push your products higher; decrease
it to let trending items breathe. Set it per-product instead by adding a
`boost` field on a product and reading it in `smartScore`.
