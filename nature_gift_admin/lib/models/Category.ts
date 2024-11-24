import { Schema, Document } from "mongoose";
import { getOrCreateModel } from "../utils";
import { IMedia } from "./Media";

// Define an interface for the Category document
interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: IMedia;
  featured: boolean;
  parent?: ICategory;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Mongoose schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    image: {
      type: Schema.Types.ObjectId,
      ref: "Media",
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    metadata: {
      seoTitle: String,
      seoDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Category = getOrCreateModel("Category", categorySchema);

export default Category;
export type { ICategory };
