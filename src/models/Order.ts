
// //models/Order.ts  
// import mongoose from "mongoose";

// const CartItemSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   originalPrice: { type: Number },
//   image: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   inStock: { type: Boolean, default: true },
//   category: { type: String, default: '' },
// });

// const ShippingAddressSchema = new mongoose.Schema({
//   firstName: { type: String, default: 'Not Provided' },
//   lastName: { type: String, default: 'Not Provided' },
//   email: { type: String, required: true },
//   phone: { type: String, default: 'Not Provided' },
//   address: { type: String, required: true },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   zipCode: { type: String, required: true },
//   country: { type: String, required: true },
// });

// const OrderSchema = new mongoose.Schema(
//   {
//     id: { type: String, required: true, unique: true },
//     items: [CartItemSchema],
//     total: { type: Number, required: true },
//     subtotal: { type: Number, required: true },
//     tax: { type: Number, required: true },
//     shipping: { type: Number, required: true },
//     discount: { type: Number, default: 0 },
//     shippingAddress: ShippingAddressSchema,
//     paymentMethod: { type: String, required: true },
//     estimatedDelivery: { type: String },
//     status: {
//       type: String,
//       enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
//       default: "pending",
//     },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);



///////////

import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  // Make image optional with a default fallback
  image: { type: String, default: '/placeholder-image.jpg' },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  category: { type: String, default: '' },
});

const ShippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, default: 'Not Provided' },
  lastName: { type: String, default: 'Not Provided' },
  email: { type: String, required: true },
  phone: { type: String, default: 'Not Provided' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    items: [CartItemSchema],
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shippingAddress: ShippingAddressSchema,
    paymentMethod: { type: String, required: true },
    estimatedDelivery: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);