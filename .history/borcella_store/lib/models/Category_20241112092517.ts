import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: false,
  },
  media: { type: mongoose.Schema.Types.ObjectId, ref: "media" },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: false,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
