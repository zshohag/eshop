// components/checkout/OrderItem.tsx
"use client";

import Image from "next/image";

interface OrderItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    images?: string[];
  };
}

export default function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={item.images?.[0] || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate">{item.name}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Qty: {item.quantity}</span>
          <span>×</span>
          <span>${item.price}</span>
        </div>
      </div>
      <div className="text-sm font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
