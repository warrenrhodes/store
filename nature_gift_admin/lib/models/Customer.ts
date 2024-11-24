import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "../types";
import { getOrCreateModel } from "../utils";

interface ICustomer extends Document {
  clerkId: string;
  name: string;
  email: string;
  orders: IOrder[];
  createdAt?: Date;
  updatedAt?: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    clerkId: String,
    name: String,
    email: String,
    orders: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = getOrCreateModel("Customer", customerSchema);

export default Customer;
export type { ICustomer };
