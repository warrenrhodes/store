import mongoose from "mongoose";
import { IProduct } from "./models/Product";

export interface IOrder extends Document {
  deliveryInfo: {
    address: string;
    deliveryDate: Date;
    deliveryTime: string;
    city: string;
    notes?: string;
  };
  userData: {
    email?: string;
    fullName: string;
    phone: string;
    phoneContainsWhatsApp: boolean;
    whatsAppNumber?: string;
  };
  items: Array<{
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    promotion?: {
      id: mongoose.Types.ObjectId;
      discountAmount: number;
      promotionName: string;
    };
  }>;
  orderPrices: {
    totalAmount: number;
    discountAmount?: number;
    totalWithoutDiscount?: number;
    totalWithDiscount?: number;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: IProduct[];
};

export enum ContentType {
  "TEXT" = "TEXT",
  "IMAGE" = "IMAGE",
  "VIDEO" = "VIDEO",
  "HTML" = "HTML",
}
export interface StoredProductDescription {
  id: string;
  type: ContentType;
  content: string | null;
  mediaIds: string[] | null;
}
export type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

export type OrderItemType = {
  product: IProduct;
  color: string;
  size: string;
  quantity: number;
};
