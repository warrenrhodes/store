import { ReviewType, PromotionType, BeneficeType } from "@/lib/types";

const timestamp = Date.now().toString(36);

export const benefices: BeneficeType[] = [
  {
    _id: "1",
    productId: "672b4f67297584e8eb4389ca",
    title: "<strong>Amélioration</strong> de l'énergie",
    description:
      "<p>Le café Cordyceps aide à <strong>augmenter</strong> les niveaux d'énergie et à <strong>réduire</strong> la fatigue, ce qui le rend idéal pour un coup de fouet matinal.</p>",
  },
  {
    _id: "2",
    productId: "672b4f67297584e8eb4389ca",
    title: "<strong>Renforcement</strong> du système immunitaire",
    description:
      "<p><strong>Riche en antioxydants</strong>, le café Cordyceps contribue à <strong>renforcer votre système immunitaire</strong> et à protéger votre corps contre les maladies.</p>",
  },
  {
    _id: "3",
    productId: "672b4f67297584e8eb4389ca",
    title: "Amélioration de la <strong>performance physique</strong>",
    description:
      "<p>Le café Cordyceps est connu pour améliorer la <strong>performance physique</strong>, ce qui en fait un excellent choix pour les athlètes et les amateurs de fitness.</p>",
  },
  {
    _id: "4",
    productId: "672b4f67297584e8eb4389ca",
    title: "Soutien à la <strong>santé mentale</strong>",
    description:
      "<p>Les composés présents dans le café Cordyceps peuvent aider à <strong>améliorer la concentration</strong> et à réduire le stress, favorisant ainsi une meilleure <strong>santé mentale</strong>.</p>",
  },
];

export const promotions: PromotionType[] = [
  {
    _id: "1",
    productId: "672b4f67297584e8eb4389ca",
    promotionName: "Cordyceps",
    expensePrix: 20000,
    currentPrix: 15000,
    reductionInPercent: 20,
    minQuantity: 1,
  },
  {
    _id: "2",
    productId: "672b4f67297584e8eb4389ca",
    promotionName: "Cordyceps",
    expensePrix: 40000,
    currentPrix: 28000,
    reductionInPercent: 35,
    minQuantity: 2,
  },
];

export const reviews: ReviewType[] = [
  {
    _id: "1",
    productId: "672b4f67297584e8eb4389ca",
    userName: "Alice",
    rating: 4.5,
    comment: "Great coffee! Smooth taste and rich aroma.",
    imageUrl:
      "https://st2.depositphotos.com/1518767/9054/i/450/depositphotos_90541628-stock-photo-smiling-crestive-business-woman.jpg",
    createdAt: new Date("2024-01-10"),
  },
  {
    _id: "2",
    productId: "672b4f67297584e8eb4389ca",
    userName: "Bob",
    rating: 3.0,
    comment: "It's decent but not worth the price.",
    imageUrl:
      "https://st2.depositphotos.com/1662991/8837/i/450/depositphotos_88370500-stock-photo-mechanic-wearing-overalls.jpg",
    createdAt: new Date("2024-01-11"),
  },
  {
    _id: "3",
    productId: "672b4f67297584e8eb4389ca",
    userName: "Charlie",
    rating: 5.0,
    comment: "Absolutely love this coffee! Will buy again.",
    imageUrl:
      "https://img.freepik.com/psd-gratuit/personne-celebrant-son-orientation-sexuelle_23-2150115662.jpg",
    createdAt: new Date("2024-01-12"),
  },
];
