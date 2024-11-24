import { Schema, Document } from "mongoose";
import { getOrCreateModel } from "../utils";
import { IMedia } from "./Media";
import { ICategory } from "./Category";

// Define interfaces for nested schemas
interface IContent {
  contentType: "TEXT" | "HTML";
  content: string;
}

interface IPrice {
  regular: number;
  sale?: number;
  saleStartDate?: Date;
  saleEndDate?: Date;
}

interface IFeature {
  icon: string;
  title: string;
  description?: IContent;
}

interface IShipmentDetail {
  icon: string;
  description: string;
}

interface IInventory {
  quantity: number;
  lowStockThreshold: number;
  stockQuantity?: number;
}

interface IMetadata {
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

// Define the main Product interface
interface IProduct extends Document {
  title: string;
  slug: string;
  description: IContent;
  media: IMedia[];
  categories: ICategory[];
  tags?: string[];
  price: IPrice;
  features?: IFeature[];
  shipmentDetails?: IShipmentDetail[];
  status: "draft" | "published" | "archived";
  visibility: boolean;
  inventory: IInventory;
  metadata: IMetadata;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Mongoose schema
const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      contentType: {
        type: String,
        enum: ["TEXT", "HTML"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
    media: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Media",
          required: true,
        },
      ],
      required: true,
    },
    categories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
      ],
    },
    tags: [String],
    price: {
      regular: {
        type: Number,
        required: true,
        min: [0, "Regular price must be non-negative"],
      },
      sale: {
        type: Number,
      },
      saleStartDate: Date,
      saleEndDate: Date,
    },
    features: [
      {
        icon: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          contentType: {
            type: String,
            enum: ["TEXT", "HTML"],
          },
          content: String,
        },
      },
    ],
    shipmentDetails: [
      {
        icon: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    inventory: {
      quantity: {
        type: Number,
        default: 0,
      },
      lowStockThreshold: {
        type: Number,
        default: 5,
      },
      stockQuantity: {
        type: Number,
        default: 0,
      },
    },
    metadata: {
      seoTitle: {
        type: String,
        required: true,
      },
      seoDescription: {
        type: String,
        required: true,
      },
      keywords: {
        type: [String],
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Mongoose model
const Product = getOrCreateModel<IProduct>("Product", productSchema);

export default Product;
export type { IProduct };
