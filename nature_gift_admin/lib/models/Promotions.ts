import mongoose, { Schema } from "mongoose";
import { getOrCreateModel } from "../utils";

interface IPromotionAction {
  type:
    | "PERCENTAGE_DISCOUNT"
    | "FIXED_DISCOUNT"
    | "FREE_SHIPPING"
    | "FREE_PRODUCT"
    | "BUY_X_GET_Y";
  value: number | string | string[];
  maxDiscount?: number;
}

interface IPromotionCondition {
  type:
    | "MINIMUM_QUANTITY"
    | "SPECIFIC_PRODUCTS"
    | "DELIVERY_METHOD"
    | "LOCATION";
  value: number | string | string[];
}

interface IPromotion extends mongoose.Document {
  code: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  conditions: IPromotionCondition[];
  actions: IPromotionAction[];
  usageLimit: {
    perCustomer: number;
    total: number;
  };
  status: "DRAFT" | "ACTIVE" | "EXPIRED" | "DISABLED";
  priority: number;
  metadata: {
    createdBy: string;
    updatedBy: string;
    notes: string;
  };
}

const promotionActionSchema = new Schema({
  type: {
    type: String,
    enum: [
      "PERCENTAGE_DISCOUNT",
      "FIXED_DISCOUNT",
      "FREE_SHIPPING",
      "FREE_PRODUCT",
      "BUY_X_GET_Y",
    ],
    required: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v: any[]) {
        return (
          typeof v === "number" ||
          typeof v === "string" ||
          (Array.isArray(v) && v.every((item) => typeof item === "string"))
        );
      },
      message: "Value must be a number, string, or array of strings",
    },
  },
  maxDiscount: {
    type: Number,
  },
});

const promotionConditionSchema = new Schema({
  type: {
    type: String,
    enum: [
      "MINIMUM_QUANTITY",
      "SPECIFIC_PRODUCTS",
      "DELIVERY_METHOD",
      "LOCATION",
    ],
    required: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
    validate: {
      validator: function (v: any[]) {
        return (
          typeof v === "number" ||
          typeof v === "string" ||
          (Array.isArray(v) && v.every((item) => typeof item === "string"))
        );
      },
      message: "Value must be a number, string, or array of strings",
    },
  },
});

const promotionSchema = new Schema<IPromotion>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    conditions: [promotionConditionSchema],
    actions: [promotionActionSchema],
    usageLimit: {
      perCustomer: Number,
      total: Number,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "EXPIRED", "DISABLED"],
      default: "DRAFT",
    },
    priority: {
      type: Number,
      default: 0,
    },
    metadata: {
      createdBy: {
        type: String,
        required: true,
      },
      updatedBy: {
        type: String,
        required: true,
      },
      notes: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
promotionSchema.index({ code: 1 });
promotionSchema.index({ status: 1 });
promotionSchema.index({ startDate: 1, endDate: 1 });

// Middleware to auto-update status based on dates
promotionSchema.pre("save", function (next) {
  const now = new Date();
  if (this.startDate > now) {
    this.status = "DRAFT";
  } else if (this.endDate < now) {
    this.status = "EXPIRED";
  }
  next();
});

export const Promotion = getOrCreateModel("Promotion", promotionSchema);
export type { IPromotion, IPromotionAction, IPromotionCondition };
