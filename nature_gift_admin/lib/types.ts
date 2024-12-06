import { IProduct } from "./models/Product";

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
