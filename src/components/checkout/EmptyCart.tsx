
// components/checkout/EmptyCart.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Add some items to your cart before proceeding to checkout.
        </p>
        <Link href="/products">
          <Button className="bg-black text-white px-8 py-3">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
