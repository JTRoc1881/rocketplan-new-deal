# RocketPlan New Deal (static pages)

- `/` (index.html) and `/d.html`: the client's live deal page, `?c=<CODE>`.
- `/new/`: the sales rep builder, opened from the RocketCRM sidebar with `?k=<key>&rep=&email=`.

Both pages talk to the Supabase edge function `new-deal`. Served at https://deal.rocketplan.ai via GitHub Pages.
- `/pricing.js`: the pricing model (totals and the payment schedule). The same file is bundled into the edge function, so the builder, the client page and the invoice always agree. Source of truth: `apps/new-deal/pricing.js` in the qbo-stripe-sync repo.
