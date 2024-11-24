import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  deliveryInfo: {
    address: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    deliveryTime: { type: String, required: true },
    city: { type: String, required: true },
    notes: String,
  },
  userData: {
    email: String,
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    phoneContainsWhatsApp: Boolean,
    whatsAppNumber: String,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      promotion: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Promotion",
        },
        discountAmount: Number,
        promotionName: String,
      },
    },
  ],
  orderPrices: {
    totalAmount: { type: Number, required: true },
    discountAmount: Number,
    totalWithoutDiscount: Number,
    totalWithDiscount: Number,
  },
  status: {
    type: String,
    enum: [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ],
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
//   customerClerkId: String,
//   products: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//       },
//       color: String,
//       size: String,
//       quantity: Number,
//     },
//   ],
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     postalCode: String,
//     country: String,
//   },
//   shippingRate: String,
//   totalAmount: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
