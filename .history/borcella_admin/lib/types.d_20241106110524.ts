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
  video;
  url: string[];
  fileName: string;
  createdAt: string;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [Media];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  longDescription: [StoredProductDescription];
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
