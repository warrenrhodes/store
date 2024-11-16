export type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

export interface CategoryType {
  _id: string;
  title: string;
  shortDescription?: string | null;
  media?: MediaType | null;
  parent?: CategoryType | null;
  products: ProductType[];
  updatedAt: string;
  createdAt: string;
}

export enum ContentType {
  "TEXT" = "TEXT",
  "IMAGE" = "IMAGE",
  "VIDEO" = "VIDEO",
}
export interface StoredProductDescription {
  id: string;
  type: ContentType;
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
export type ShipmentDetailType = {
  icon: string;
  description: string;
};

export interface BeneficeType {
  icon: string;
  title: string;
  description?: string;
}

export interface PromotionType {
  _id: string;
  product: ProductType;
  promotionName: string;
  discountValue: number;
  minProductsToApply: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewType {
  _id: string;
  product: ProductType;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  helpful?: number;
  verify: boolean;
  notHelpful?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [MediaType];
  categories: [CategoryType];
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

export type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

export type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

export type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};
