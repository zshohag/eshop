// import { LucideIcon } from "lucide-react";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   category: string;
//   quantity: number;
//   description: string;
//   features: string[];
//   rating: number;
//   reviews: number;
//   inStock: boolean;
//   badge?: string;
// }

// // export interface CartItem extends Product {
// //   quantity: number
// // }

// export interface Category {
//   id: string;
//   name: string;
//   icon: LucideIcon;
//   count: number;
// }

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   quantity: number;
//   inStock?: boolean;
//   category?: string;
// }

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }

// export type OrderStatus =
//   | "pending"
//   | "processing"
//   | "shipped"
//   | "delivered"
//   | "cancelled";

// export type PaymentMethodType =
//   | string
//   | {
//       type: string;
//       last4?: string;
//     };

// export interface OrderType {
//   id: string;
//   items: CartItem[];
//   total: number;
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   discount?: number;
//   shippingAddress: ShippingAddress;
//   paymentMethod?: PaymentMethodType;
//   status: OrderStatus;
//   estimatedDelivery?: string; // ✅ Add this line
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface Order {
//   _id?: string;
//   id: string;
//   items: CartItem[];
//   total: number;
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   shippingAddress: ShippingAddress;
//   paymentMethod: string;
//   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
//   createdAt: string;
//   updatedAt: string;
//   estimatedDelivery?: string; // Optional field for estimated delivery date
//   discount?: number; // Optional field for discount amount
// }

/////////////////////////////////////

/////////NEW ///////////  OKAY

// import { LucideIcon } from "lucide-react";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   category: string;
//   quantity: number;
//   description: string;
//   features: string[];
//   rating: number;
//   reviews: number;
//   inStock: boolean;
//   badge?: string;
// }

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   images: string[];
//   quantity: number;
//   inStock?: boolean;
//   category?: string;
// }

// export interface Category {
//   id: string;
//   name: string;
//   icon: LucideIcon;
//   count: number;
// }

// export interface ShippingAddress {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
// }

// export type OrderStatus =
//   | "pending"
//   | "processing"
//   | "shipped"
//   | "delivered"
//   | "cancelled";

// export type PaymentMethodType =
//   | string
//   | {
//       type: "card" | "google_pay" | "apple_pay" | "paypal";
//       last4?: string;
//       brand?: string;
//     };

// export interface OrderType {
//   id: string;
//   items: CartItem[];
//   total: number;
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   discount?: number;
//   shippingAddress: ShippingAddress;
//   paymentMethod?: PaymentMethodType;
//   status: OrderStatus;
//   estimatedDelivery?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface Order {
//   _id?: string;
//   id: string;
//   items: CartItem[];
//   total: number;
//   subtotal: number;
//   tax: number;
//   shipping: number;
//   shippingAddress: ShippingAddress;
//   paymentMethod: string;
//   status: OrderStatus;
//   createdAt: string;
//   updatedAt: string;
//   estimatedDelivery?: string;
//   discount?: number;
// }

// // Additional types for Google Pay integration
// export interface GooglePayToken {
//   id: string;
//   type: string;
//   card?: {
//     brand: string;
//     last4: string;
//   };
// }

// export interface PaymentData {
//   paymentToken: string;
//   amount: number;
//   currency?: string;
//   orderDetails: {
//     email: string;
//     items: {
//       id: string;
//       name: string;
//       quantity: number;
//       price: number;
//     }[];
//     shippingAddress: {
//       line1: string;
//       city: string;
//       state: string;
//       postal_code: string;
//       country: string;
//     };
//   };
// }

/// ANOTHER UPDATE

import { LucideIcon } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  quantity: number;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  badge?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  // Support both images array and single image
  images?: string[];
  image?: string;
  quantity: number;
  inStock?: boolean;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethodType =
  | string
  | {
      type: "card" | "google_pay" | "apple_pay" | "paypal";
      last4?: string;
      brand?: string;
    };

export interface OrderType {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  shippingAddress: ShippingAddress;
  paymentMethod?: PaymentMethodType;
  status: OrderStatus;
  estimatedDelivery?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  _id?: string;
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  discount?: number;
}

// Additional types for Google Pay integration
export interface GooglePayToken {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
  };
}

export interface PaymentData {
  paymentToken: string;
  amount: number;
  currency?: string;
  orderDetails: {
    email: string;
    items: {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }[];
    shippingAddress: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
}
