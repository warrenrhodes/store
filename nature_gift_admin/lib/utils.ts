import { type ClassValue, clsx } from "clsx";
import mongoose, { Schema, Model, Document } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Singleton pattern to prevent model redefinition
export function getOrCreateModel<T extends Document>(
  modelName: string,
  schema: Schema<T>
): Model<T> {
  // Check if the model already exists
  if (mongoose.models?.[modelName]) {
    return mongoose.models[modelName] as Model<T>;
  }

  // If not, create and return the model
  return mongoose.model<T>(modelName, schema);
}
