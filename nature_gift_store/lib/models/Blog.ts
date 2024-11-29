import mongoose, { Document } from "mongoose";
import { getOrCreateModel } from "../utils";
import { ICategory } from "./Category";

interface IBlog extends Document {
  slug: string;
  title: string;
  content: {
    type: "TEXT" | "HTML" | "MARKDOWN";
    content: string;
    excerpt?: string;
  };
  categories: ICategory[];
  metadata: {
    title: string;
    description?: string;
    keywords: string[];
    author: {
      name: string;
      bio?: string;
      avatar?: string;
    };
    readingTime?: number;
    coverImage?: string;
    featured: boolean;
  };
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt?: Date;
  comments?: boolean;
  layout: "DEFAULT" | "FEATURED" | "MINIMAL";
  customFields: {
    [key: string]: string;
  };
}

const blogContentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["TEXT", "HTML", "MARKDOWN"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: String,
});

const blogMetadataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  description: String,
  keywords: [String],
  author: {
    name: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: String,
  },
  readingTime: Number,
  coverImage: String,
  featured: {
    type: Boolean,
    default: false,
  },
});

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    content: {
      type: blogContentSchema,
      required: true,
    },
    metadata: {
      type: blogMetadataSchema,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [String],
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },
    publishedAt: Date,
    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    layout: {
      type: String,
      enum: ["DEFAULT", "FEATURED", "MINIMAL"],
      default: "DEFAULT",
    },
    comments: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Blog = getOrCreateModel("Blog", blogSchema);

export default Blog;
export type { IBlog };
