// Legal pages (docs/MULTI_TENANT_PLAN.md, phase 5): a store's sales terms, privacy policy and
// legal notice, built from its settings; the marketplace's terms of use, privacy policy, legal
// notice and seller terms. Templates in French, to be reviewed by a lawyer before relying on
// them; each store can replace the returns section (admin, Store settings).
import type { StoreLegal } from '@/lib/firebase/models'
import { PLATFORM_LEGAL } from '@/lib/platform-site'

export const LEGAL_DOCS = ['conditions', 'confidentialite', 'mentions-legales', 'vendeurs'] as const
export type LegalDoc = (typeof LEGAL_DOCS)[number]

/** The pages a site has: the seller terms only on the marketplace. */
export const legalDocsOf = (isMarket: boolean): LegalDoc[] =>
  isMarket ? [...LEGAL_DOCS] : LEGAL_DOCS.filter(d => d !== 'vendeurs')

export const LEGAL_TITLES: Record<LegalDoc, { fr: string; en: string }> = {
  conditions: { fr: 'Conditions générales', en: 'Terms and conditions' },
  confidentialite: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
  'mentions-legales': { fr: 'Mentions légales', en: 'Legal notice' },
  vendeurs: { fr: 'Conditions vendeurs', en: 'Seller terms' },
}

export type LegalSection = { heading: string; paragraphs: string[] }
export type LegalPage = { title: string; sections: LegalSection[] }

/** Who is behind a site, as its legal pages name them. */
export type LegalParty = {
  name: string
  legal?: StoreLegal | null
  email?: string | null
  whatsapp?: string | null
}

const LAWS = {
  ecommerce:
    'la loi n° 2010/021 du 21 décembre 2010 régissant le commerce électronique au Cameroun',
  consumer: 'la loi-cadre n° 2011/012 du 6 mai 2011 portant protection du consommateur au Cameroun',
  data: 'la loi n° 2024/017 du 23 décembre 2024 relative à la protection des données à caractère personnel au Cameroun',
}

const identity = (p: LegalParty) =>
  [
    p.legal?.companyName || p.name,
    p.legal?.address && `Adresse : ${p.legal.address}`,
    p.legal?.registration && `RCCM : ${p.legal.registration}`,
    p.legal?.taxId && `NIU : ${p.legal.taxId}`,
    p.email && `Email : ${p.email}`,
    p.whatsapp && `Téléphone / WhatsApp : +${p.whatsapp}`,
  ].filter((line): line is string => !!line)

const contactOf = (p: LegalParty) =>
  [p.email, p.whatsapp && `+${p.whatsapp} (WhatsApp)`].filter(Boolean).join(' ou ') ||
  'les coordonnées indiquées sur la page Contact'

const PLATFORM: LegalParty = PLATFORM_LEGAL

const HOSTING = [
  `Plateforme : ${PLATFORM.name}, ${contactOf(PLATFORM)}.`,
  `Hébergement : ${PLATFORM_LEGAL.hosting}.`,
]

const dataSection = (controller: LegalParty, isMarket: boolean): LegalSection[] => [
  {
    heading: 'Responsable du traitement',
    paragraphs: [
      isMarket
        ? `${PLATFORM.name} est responsable des données traitées pour faire fonctionner la marketplace. Pour une commande, la boutique qui vend le produit est responsable des données nécessaires à sa préparation et à sa livraison.`
        : `${controller.legal?.companyName || controller.name} (le vendeur) est responsable des données de ses clients. La plateforme ${PLATFORM.name}, qui héberge la boutique, les traite pour son compte.`,
      `Ce traitement respecte ${LAWS.data}.`,
    ],
  },
  {
    heading: 'Données collectées',
    paragraphs: [
      'Lors d’une commande : nom, numéro de téléphone, email (facultatif), adresse, quartier et ville de livraison, date souhaitée, produits commandés et montants.',
      'Lors de la saisie du formulaire de commande, avant validation : nom, téléphone et panier, pour pouvoir vous recontacter si la commande n’est pas terminée.',
      'Avec un compte client : email et informations de profil. Les avis laissés sur les produits (prénom, initiale du nom, note, commentaire).',
      'Le panier, les favoris et vos coordonnées de livraison sont aussi gardés dans votre navigateur pour vous éviter de les saisir à nouveau.',
    ],
  },
  {
    heading: 'Finalités',
    paragraphs: [
      'Traiter, livrer et suivre les commandes ; vous contacter à leur sujet ; répondre à vos messages ; publier les avis après modération ; prévenir la fraude.',
      'Mesure d’audience et publicité : si la boutique les a activés, Google Tag Manager et le Pixel Meta (Facebook) mesurent les visites et les achats, y compris par l’API Conversions de Meta à partir de votre téléphone, nom, email et ville, transmis sous forme chiffrée (hachage SHA-256). Ils servent à mesurer et améliorer les publicités.',
    ],
  },
  {
    heading: 'Destinataires et transferts',
    paragraphs: [
      'Le vendeur et ses livreurs ; la plateforme ; ses prestataires techniques : Google (Firebase, hébergement des données), NotificationAPI (emails et SMS), Cloudinary (images), et Meta et Google pour la mesure publicitaire quand elle est activée.',
      'Ces prestataires peuvent stocker les données hors du Cameroun, notamment aux États-Unis et dans l’Union européenne, avec des garanties de sécurité contractuelles.',
    ],
  },
  {
    heading: 'Durée de conservation',
    paragraphs: [
      'Les commandes sont conservées pendant la durée nécessaire à leur gestion, puis le temps imposé par les obligations comptables et fiscales. Un panier non terminé est conservé au plus 12 mois. Les données du navigateur restent jusqu’à ce que vous les effaciez.',
    ],
  },
  {
    heading: 'Vos droits',
    paragraphs: [
      'Vous pouvez demander l’accès à vos données, leur rectification, leur suppression, ou vous opposer à leur utilisation à des fins publicitaires, conformément à la loi n° 2024/017.',
      `Écrivez à ${contactOf(controller)}. Vous pouvez aussi saisir l’autorité camerounaise de protection des données personnelles.`,
    ],
  },
]

/** The page's content, or undefined when the site has no such page. */
export function legalPage(
  doc: LegalDoc,
  site: LegalParty,
  isMarket: boolean,
): LegalPage | undefined {
  if (!legalDocsOf(isMarket).includes(doc)) return undefined
  const seller = site.legal?.companyName || site.name
  switch (doc) {
    case 'mentions-legales':
      return {
        title: LEGAL_TITLES[doc].fr,
        sections: [
          {
            heading: isMarket ? 'Éditeur de la marketplace' : 'Éditeur de la boutique',
            paragraphs: identity(site),
          },
          ...(isMarket
            ? []
            : [
                {
                  heading: 'Plateforme',
                  paragraphs: [
                    `La boutique ${site.name} est hébergée sur la plateforme ${PLATFORM.name}, qui fournit le site, l’hébergement et les outils de vente. Le vendeur est seul responsable de son catalogue, de ses prix et de ses ventes.`,
                  ],
                },
              ]),
          { heading: 'Hébergement', paragraphs: HOSTING },
          {
            heading: 'Propriété intellectuelle',
            paragraphs: [
              `Les textes, photos et marques de ce site appartiennent à ${isMarket ? `${PLATFORM.name} et aux boutiques qui les publient` : seller}. Toute reproduction sans autorisation est interdite.`,
            ],
          },
        ],
      }
    case 'confidentialite':
      return { title: LEGAL_TITLES[doc].fr, sections: dataSection(site, isMarket) }
    case 'vendeurs':
      return {
        title: LEGAL_TITLES[doc].fr,
        sections: [
          {
            heading: 'Objet',
            paragraphs: [
              `Ces conditions encadrent l’utilisation de la plateforme ${PLATFORM.name} par les vendeurs : boutique en ligne à l’adresse /boutique/<nom>, tableau de bord, et présence sur la marketplace.`,
            ],
          },
          {
            heading: 'Abonnement et paiement',
            paragraphs: [
              'La boutique est créée « en attente ». Elle ouvre au public quand la plateforme a reçu le paiement de l’abonnement, en espèces, pour la durée convenue. Le montant est communiqué par la plateforme avant le paiement.',
              'Sans renouvellement à l’échéance, la plateforme peut suspendre la boutique ; elle rouvre au paiement suivant. Le catalogue et les commandes sont conservés pendant la suspension.',
            ],
          },
          {
            heading: 'Obligations du vendeur',
            paragraphs: [
              `Le vendeur est le seul vendeur des produits de sa boutique : il fixe ses prix, décrit fidèlement ses produits, détient les droits sur ses photos et textes, livre les commandes qu’il accepte et traite les réclamations, dans le respect de ${LAWS.consumer} et de ${LAWS.ecommerce}.`,
              'Il ne vend que des produits licites, sans contrefaçon, et renseigne ses informations légales (raison sociale, RCCM, NIU) dans ses réglages.',
              `Il est responsable du traitement des données de ses clients (${LAWS.data}) et ne les utilise que pour ses ventes.`,
            ],
          },
          {
            heading: 'Marketplace et modération',
            paragraphs: [
              'Les produits d’une boutique active apparaissent sur la marketplace. La plateforme peut retirer de la marketplace un produit ou une boutique qui ne respecte pas ces conditions ; le produit reste sur la boutique du vendeur sauf manquement grave.',
            ],
          },
          {
            heading: 'Responsabilité et résiliation',
            paragraphs: [
              'La plateforme fournit le service tel quel et fait ses meilleurs efforts pour sa disponibilité. Elle n’est pas partie aux ventes entre vendeurs et clients.',
              'Chaque partie peut mettre fin à l’abonnement à son échéance. En cas de manquement grave, la plateforme peut suspendre la boutique sans délai.',
            ],
          },
          {
            heading: 'Droit applicable',
            paragraphs: [
              'Ces conditions sont soumises au droit camerounais. À défaut d’accord amiable, les tribunaux de Yaoundé sont compétents.',
            ],
          },
        ],
      }
    case 'conditions':
      return isMarket
        ? {
            title: LEGAL_TITLES[doc].fr,
            sections: [
              {
                heading: 'Objet',
                paragraphs: [
                  `${PLATFORM.name} est une marketplace : elle présente les produits de plusieurs boutiques indépendantes. Chaque produit est vendu par la boutique indiquée sur sa fiche (« Vendu par »), qui est le vendeur.`,
                ],
              },
              {
                heading: 'Commandes',
                paragraphs: [
                  'Un panier qui contient des produits de plusieurs boutiques donne une commande par boutique. Chaque boutique confirme, livre et facture sa commande, avec ses propres frais de livraison et promotions.',
                  'Les conditions de vente de chaque boutique s’appliquent à sa commande : elles sont disponibles en bas de sa boutique.',
                ],
              },
              {
                heading: 'Paiement et livraison',
                paragraphs: [
                  'Le paiement se fait à la livraison, auprès de la boutique ou de son livreur. Les frais de livraison sont affichés avant la validation ; pour un quartier non listé, ils sont confirmés par la boutique.',
                ],
              },
              {
                heading: 'Rôle de la plateforme',
                paragraphs: [
                  `${PLATFORM.name} fournit le site et transmet les commandes aux boutiques ; elle n’est pas partie au contrat de vente. Pour un problème avec une boutique, contactez d’abord la boutique, puis ${contactOf(PLATFORM)} si aucune solution n’est trouvée.`,
                ],
              },
              {
                heading: 'Droit applicable',
                paragraphs: [
                  `Ces conditions sont soumises au droit camerounais, notamment ${LAWS.ecommerce} et ${LAWS.consumer}.`,
                ],
              },
            ],
          }
        : {
            title: 'Conditions générales de vente',
            sections: [
              {
                heading: 'Vendeur',
                paragraphs: [
                  `Les produits de cette boutique sont vendus par :`,
                  ...identity(site),
                  `La boutique est hébergée sur la plateforme ${PLATFORM.name}, qui n’est pas partie à la vente.`,
                ],
              },
              {
                heading: 'Commandes',
                paragraphs: [
                  'La commande se passe en ligne, sans paiement en ligne. Le vendeur la confirme par téléphone ou WhatsApp ; il peut la refuser si un produit n’est plus disponible ou si la livraison est impossible.',
                ],
              },
              {
                heading: 'Prix et paiement',
                paragraphs: [
                  'Les prix sont en francs CFA (XAF), toutes taxes comprises. Les frais de livraison et les promotions applicables sont affichés avant la validation de la commande.',
                  'Le paiement se fait à la livraison.',
                ],
              },
              {
                heading: 'Livraison',
                paragraphs: [
                  'Les zones et les frais de livraison sont ceux affichés au moment de la commande. Pour un quartier non listé, les frais sont confirmés par le vendeur avant la livraison. Les délais sont indicatifs.',
                ],
              },
              {
                heading: 'Retours et réclamations',
                paragraphs: site.legal?.returnPolicy
                  ? site.legal.returnPolicy.split(/\n\s*\n/)
                  : [
                      'Vérifiez votre commande à la livraison. Pour un produit manquant, abîmé ou non conforme, contactez le vendeur dans les 48 heures : il l’échange ou le rembourse.',
                      `Vos droits de consommateur restent garantis par ${LAWS.consumer}.`,
                    ],
              },
              {
                heading: 'Données personnelles',
                paragraphs: [
                  'Vos données sont traitées comme indiqué dans la politique de confidentialité de la boutique.',
                ],
              },
              {
                heading: 'Droit applicable',
                paragraphs: [
                  `Ces conditions sont soumises au droit camerounais, notamment ${LAWS.ecommerce}. En cas de litige, une solution amiable est recherchée avant tout recours ; à défaut, les tribunaux compétents sont ceux du lieu du vendeur. Contact : ${contactOf(site)}.`,
                ],
              },
            ],
          }
  }
}
