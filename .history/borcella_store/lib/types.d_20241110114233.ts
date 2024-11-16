interface CartItem {
  item: ProductType;
  quantity: number;
  promotion?: PromotionType;
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
  benefices: [BeneficeType];
  shipmentDetails: [ShipmentDetailType];
  createdAt: string;
  updatedAt: string;
  inPromoTion: boolean;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
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

interface PromotionType {
  _id: string;
  product: ProductType;
  promotionName: string;
  discountValue: number;
  minProducts: number;
}

interface ReviewType {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  createdAt: Date;
}

interface BeneficeType {
  _id: string;
  productId: string;
  title: string;
  description: string;
}
