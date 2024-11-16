import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  promotionName: {
    type: String,
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  minProductsToApply: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Promotion =
  mongoose.models.Promotion || mongoose.model("Promotion", PromotionSchema);

export default Promotion;
