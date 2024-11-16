interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

export interface MediaType {
  _id: string;
  type: "image" | "video";
  url: string;
  fileName: string;
  createdAt: string;
}

export type ElementType = "text" | "image" | "video";
export interface StoredProductDescription {
  id: number;
  type: ElementType;
  content: string | null;
  mediaIds: string[] | null;
}

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [MediaType];
  category: string;
  collections: [string];
  tags: [string];
  price: number;
  expense: number;
  sizes: [string];
  colors: [string];
  longDescription: [StoredProductDescription];
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType];
  shippingRate: string;
  totalAmount: number;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
};
