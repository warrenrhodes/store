import mongoose, { Document } from "mongoose";
import { getOrCreateModel } from "../utils";
import { ICategory } from "./Category";
import cron from "node-cron";
import { IMedia } from "./Media";

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
    coverImage?: IMedia;
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
  coverImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
  },
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

blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ "metadata.featured": 1 });
blogSchema.index({ categories: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ createdAt: -1 });

// Calculate reading time before saving
blogSchema.pre("save", function (next) {
  const wordsPerMinute = 200;
  const wordCount = this.content.content.split(/\s+/).length;
  this.metadata.readingTime = Math.ceil(wordCount / wordsPerMinute);
  next();
});

blogSchema.pre("save", function (next) {
  const now = new Date();
  if (
    this.publishedAt &&
    new Date(this.publishedAt) > now &&
    this.status === "DRAFT"
  ) {
    this.status = "PUBLISHED";
  }
  next();
});

/// update the blog status.
function updateBlogStatus() {
  const now = new Date();

  Blog.updateMany(
    {
      publishedAt: { $lte: now },
      status: "DRAFT",
    },
    {
      $set: {
        status: "PUBLISHED",
        publishedDate: now,
      },
    }
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} blog posts to published`);
      }
    })
    .catch((error) => {
      console.error("Error updating blog status:", error);
    });
}
// Run every 30 minute
const statusUpdateJob = cron.schedule("*/30 * * * *", updateBlogStatus);

// Optional: Graceful shutdown
process.on("SIGTERM", () => {
  statusUpdateJob.stop();
});

const Blog = getOrCreateModel("Blog", blogSchema);

export default Blog;
export type { IBlog };
