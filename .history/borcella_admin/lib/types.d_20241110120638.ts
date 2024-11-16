type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

export type ElementType = "text" | "image" | "video";
export interface StoredProductDescription {
  id: number;
  type: ElementType;
  content: string | null;
  mediaIds: string[] | null;
}

export interface MediaType {
  _id: string;
  type: "image" | "video";
  url: string[];
  fileName: string;
  createdAt: string;
}
type ShipmentDetailType = {
  icon: string;
  text: string;
};

interface BeneficeType {
  icon: string;
  title: string;
  description?: string;
}

interface PromotionType {
  _id: string;
  product: ProductType;
  promotionName: string;
  discountValue: number;
  minProductsToApply: number;
}

interface ReviewType {
  _id: string;
  product: ProductType;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: Date;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [MediaType];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  longDescription: [StoredProductDescription];
  benefices: [BeneficeType];
  shipmentDetails: [ShipmentDetailType];
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};
