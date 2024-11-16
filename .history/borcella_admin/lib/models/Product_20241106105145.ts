import mongoose from "mongoose";

const StoredProductDescriptionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "image", "video"],
    required: true,
  },
  content: {
    type: String,
  },
  mediaIds: {
    type: [{ type: String }],
  },
});

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    longDescription: [StoredProductDescriptionSchema],
    media: [{ type: mongoose.Schema.Types.ObjectId, ref: "media" }],
    category: String,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String,
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    expense: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
