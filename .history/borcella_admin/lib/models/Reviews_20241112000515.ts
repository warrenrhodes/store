import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  helpful: {
    type: Number,
    required: false,
  },
  notHelpful: {
    type: Number,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;
