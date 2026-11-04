// Ready-made thank-you pages for ad pages (admin, Blogs): French, merge tags (thank-you.ts), the
// store's own theme colors (its CSS variables), styles scoped to .ty. Text in [brackets] is for
// the seller to fill in. Checked by thank-you.check.ts.

const CSS = `.ty{max-width:640px;margin:0 auto;color:hsl(var(--foreground));font-size:16px;line-height:1.6}
.ty h1{font-size:2rem;line-height:1.2;font-weight:700;text-align:center;margin:0 0 .75rem}
.ty h2{font-size:1.25rem;line-height:1.3;font-weight:700;margin:0 0 1rem}
.ty p{margin:0 0 1rem}
.ty .lead{text-align:center;color:hsl(var(--muted-foreground));margin-bottom:2rem}
.ty .card{border:1px solid hsl(var(--border));border-radius:16px;padding:24px;margin:0 0 24px;background:hsl(var(--card))}
.ty .steps{list-style:none;margin:0 0 8px;padding:0}
.ty .steps li{display:flex;gap:14px;margin:0 0 18px}
.ty .num{flex:none;width:34px;height:34px;border-radius:50%;background:hsl(var(--primary));color:hsl(var(--primary-foreground));display:flex;align-items:center;justify-content:center;font-weight:700}
.ty .steps b{display:block}
.ty .steps p{margin:0;color:hsl(var(--muted-foreground))}
.ty .alert{border-radius:12px;padding:14px 16px;margin:0;background:hsl(var(--sale) / .12);color:hsl(var(--sale));font-weight:600}
.ty .recap{width:100%;border-collapse:collapse}
.ty .recap td{padding:10px 0;border-bottom:1px solid hsl(var(--border))}
.ty .recap td+td{text-align:right;font-weight:700;white-space:nowrap}
.ty .btn{display:block;text-align:center;padding:14px 20px;border-radius:10px;background:hsl(var(--primary));color:hsl(var(--primary-foreground));font-weight:700;text-decoration:none}
.ty .muted{color:hsl(var(--muted-foreground));font-size:.9rem;text-align:center}
.ty .check{width:64px;height:64px;margin:0 auto 1.25rem;border-radius:50%;background:hsl(var(--primary) / .12);color:hsl(var(--primary));display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700}`

const page = (body: string, css = '') => `<div class="ty">${body}</div><style>${CSS}${css}</style>`

const step = (n: number, title: string, text: string) =>
  `<li><span class="num">${n}</span><div><b>${title}</b><p>${text}</p></div></li>`

const whatsapp = (label: string) =>
  `<p class="muted">${label}</p><a class="btn" href="{{whatsappUrl}}">Écrire à {{storeName}} sur WhatsApp</a>`

const codSteps = `<ol class="steps">${[
  step(1, 'Nous vous appelons pour confirmer', 'Dans les prochaines heures. Gardez votre téléphone à portée de main.'),
  step(2, 'Le livreur vous contacte le jour de la livraison', "Il vous indique l'heure de son passage."),
  step(3, 'Vous payez en recevant votre colis', '{{orderTotal}}, en espèces ou par Mobile Money. Préparez le montant exact si possible.'),
].join('')}</ol>`

const callAlert =
  '<p class="alert">Important : gardez votre téléphone allumé. Sans confirmation de votre part, nous ne pouvons pas expédier votre commande.</p>'

export const THANK_YOU_TEMPLATES = [
  {
    id: 'cod',
    name: 'Cash on delivery',
    description: 'Next steps (confirmation call, delivery, payment): fewer refused parcels.',
    html: page(
      '<h1>Merci {{customerFirstName}}, votre commande est enregistrée !</h1>' +
        '<p class="lead">Votre {{productName}} sera bientôt chez vous. Voici ce qui se passe maintenant.</p>' +
        `<div class="card"><h2>Les prochaines étapes</h2>${codSteps}${callAlert}</div>` +
        whatsapp("Une question ou une modification d'adresse ?"),
    ),
  },
  {
    id: 'upsell',
    name: 'Next steps + extra offer',
    description: 'The steps, then a one-time offer to add a product to the same parcel (via WhatsApp).',
    html: page(
      '<h1>Merci {{customerFirstName}}, votre commande est enregistrée !</h1>' +
        '<p class="lead">Votre {{productName}} sera bientôt chez vous. Voici ce qui se passe maintenant.</p>' +
        `<div class="card"><h2>Les prochaines étapes</h2>${codSteps}${callAlert}</div>` +
        '<div class="offer"><span class="badge">Uniquement sur cette page</span>' +
        '<img src="{{productImage}}" alt="{{productName}}">' +
        '<h2>Ajoutez-en un à votre colis</h2>' +
        '<p>Pour un proche, ou pour prolonger votre cure. Livré dans le même colis, sans frais de livraison en plus.</p>' +
        '<p class="price"><strong>[prix offert] FCFA</strong> <s>[prix normal] FCFA</s></p>' +
        `<a class="btn" href="{{whatsappUrl}}">Oui, j'en ajoute 1 (WhatsApp)</a>` +
        '<p class="small">Pas intéressé(e) ? Rien à faire, votre commande est déjà validée.</p></div>',
      `.ty .offer{border-radius:20px;padding:32px 24px;margin:0 0 24px;text-align:center;background:hsl(var(--foreground));color:hsl(var(--background))}
.ty .offer h2{font-size:1.6rem;margin:1rem 0 .5rem}
.ty .badge{display:inline-block;padding:4px 14px;border-radius:999px;background:hsl(var(--sale));color:hsl(var(--sale-foreground));font-size:.85rem;font-weight:700}
.ty .offer img{display:block;width:180px;height:180px;object-fit:cover;margin:16px auto 0;border-radius:14px;background:#fff}
.ty .price strong{font-size:2rem;margin-right:8px}
.ty .price s{opacity:.7}
.ty .offer .btn{background:hsl(var(--sale));color:hsl(var(--sale-foreground))}
.ty .small{margin:12px 0 0;font-size:.85rem;opacity:.75}`,
    ),
  },
  {
    id: 'simple',
    name: 'Simple',
    description: 'A short, warm thank-you with the order summary.',
    html: page(
      '<div class="check">✓</div>' +
        '<h1>Merci pour votre commande, {{customerFirstName}} !</h1>' +
        '<p class="lead">{{storeName}} prépare votre colis. Nous vous appelons très vite pour confirmer la livraison.</p>' +
        '<div class="card"><h2>Votre commande {{orderId}}</h2>' +
        '<table class="recap"><tr><td>{{productName}} × {{quantity}}</td><td>{{orderTotal}}</td></tr></table>' +
        '<p class="muted" style="margin:12px 0 0">À payer à la livraison.</p></div>' +
        whatsapp('Une question ?'),
    ),
  },
  {
    id: 'tips',
    name: 'How to use the product',
    description: 'Your advice to get the best of the product, while the parcel is on its way.',
    html: page(
      '<h1>Merci {{customerFirstName}} !</h1>' +
        '<p class="lead">Votre {{productName}} arrive bientôt. Pour en profiter au mieux, voici nos conseils.</p>' +
        `<div class="card"><h2>Bien utiliser votre produit</h2><ol class="steps">${[
          step(1, '[Comment l’utiliser]', '[La dose, le moment de la journée…]'),
          step(2, '[Combien de temps]', '[Au bout de combien de jours on voit les effets…]'),
          step(3, '[À éviter]', '[Les précautions, la conservation…]'),
        ].join('')}</ol></div>` +
        '<div class="card"><h2>Et votre commande ?</h2>' +
        '<p style="margin:0">Nous vous appelons dans les prochaines heures pour confirmer la livraison. Vous payez {{orderTotal}} en recevant votre colis. Gardez votre téléphone allumé.</p></div>' +
        whatsapp('Une question sur le produit ?'),
    ),
  },
] as const
