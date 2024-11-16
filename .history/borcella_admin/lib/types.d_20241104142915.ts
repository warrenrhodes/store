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
  content: string;
  url: string | null;
  fileName: string | null;
}

export interface MediaType {
  _id: string;
  fileName: string;
  type: "image" | "video";
  video;
  url: string;
  createdAt: string;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  medias: [Media];
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
