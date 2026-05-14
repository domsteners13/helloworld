# Next steps — pick this up when you're back

Goal: replace the placeholder products in `data/products.js` with real, UK-stocked items you can actually sell on TikTok Shop.

## 1. Create your TikTok Shop seller account

- Go to <https://seller.tiktokglobalshop.com/> and pick **United Kingdom**.
- Sign up with your business email.
- You can also start from inside the TikTok app: Profile → Settings → TikTok Shop for Sellers.

## 2. Authenticate (KYC / ID verification)

In Seller Center → Account & Settings → Account Information:

- **Sole trader / individual:** upload passport or driving licence + a recent utility bill or bank statement (proof of address).
- **Limited company:** upload Companies House registration, director's ID, and proof of business address.
- Add a UK bank account for payouts.
- Approval is usually 1-3 business days.

## 3. Pick which of the 16 trending products to stock

Open the live shop and look at the "Trending only" filter. From those 16, shortlist 4-6 to start with based on:

- **Margin** — wholesale cost vs the retail price shown
- **Repeat purchase** — consumables (litter, treats) > one-offs (glass cat house)
- **Video-ability** — products that demo well on camera (whack-a-mole, laser robot, lick mat)

Don't try to stock all 16 on day one. Pick a tight range you can film around.

## 4. Verify UK warehousing for each shortlisted product

For each shortlist item:

1. Open the supplier link from the product card (Avasam / Go Dropship / Banggood UK / Groomi).
2. Find the exact SKU.
3. **Confirm dispatch location says UK** — not "ships from CN with UK return address". This is where most dropshippers get burned.
4. Note the wholesale cost, lead time, and minimum order quantity.

For the highest-volume items, also look at **Fulfilled by TikTok (FBT) UK** in Seller Center — TikTok stores your inventory in their UK warehouse and ships next-day. Better delivery promise = better conversion.

## 5. Wire real products into the shop

Once you've got real SKUs and TikTok Shop product URLs, edit `data/products.js`:

- Replace each `image:` URL with the real product photo (from your supplier or your own shoot).
- Replace each `url:` with the real TikTok Shop deeplink: `https://shop.tiktok.com/view/product/<product-id>`.
- Update `prices: { GBP, EUR }` with your actual retail prices.
- Update `supplierUrl` and `ukWarehouse` with the real supplier and warehouse you validated.

Either edit `data/products.js` yourself or paste the SKU list back into Claude and ask it to do the wiring.

## 6. Soft launch checklist

- [ ] Seller account approved
- [ ] 4-6 products live with real photos and TikTok Shop URLs
- [ ] At least one demo video filmed per product
- [ ] Inventory confirmed in UK warehouse with lead times under 5 days
- [ ] Returns address set up (UK)
- [ ] First TikTok Shop order placed by yourself end-to-end as a test

That last one matters — buy one of your own products before promoting them, so you see exactly what the customer sees.
