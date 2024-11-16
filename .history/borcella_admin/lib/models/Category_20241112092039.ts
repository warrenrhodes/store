import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
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
    type: String,
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
