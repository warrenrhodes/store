import { ReviewType } from "@/lib/types";

const timestamp = Date.now().toString(36);

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
