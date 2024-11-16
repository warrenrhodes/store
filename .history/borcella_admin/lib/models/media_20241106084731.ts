import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);
