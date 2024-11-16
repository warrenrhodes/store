import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  filename: {
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

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
