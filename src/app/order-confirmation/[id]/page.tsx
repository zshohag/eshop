// app/order-confirmation/[id]/page.tsx

"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Truck,
  Package,
  MapPin,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
//import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types/types";

export default function OrderConfirmationPage() {
  const { currentOrder } = useAppSelector((state) => state.order);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Order not found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the order you&apos;re looking for.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Order #{currentOrder.id}</span>
              <span>•</span>
              <span>{formatDate(currentOrder.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mt-4">
                  <Package className="w-5 h-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(currentOrder.status)}>
                    {currentOrder.status}
                  </Badge>
                  {currentOrder.estimatedDelivery && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4" />
                      <span>
                        Est. delivery:{" "}
                        {formatDate(currentOrder.estimatedDelivery)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="mt-4">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="space-y-4">
                  {currentOrder.items.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {/* <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        {item.images ? (
                          <Image
                            src={item.images?.[0]}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-gray-400" />
                        )}
                      </div> */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mt-4 ">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="space-y-2">
                  <p className="font-semibold">
                    {currentOrder.shippingAddress.firstName}{" "}
                    {currentOrder.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-600">
                    {currentOrder.shippingAddress.address}
                  </p>
                  <p className="text-gray-600">
                    {currentOrder.shippingAddress.city},{" "}
                    {currentOrder.shippingAddress.state}{" "}
                    {currentOrder.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">
                    {currentOrder.shippingAddress.country}
                  </p>
                  {currentOrder.shippingAddress.phone && (
                    <p className="text-gray-600">
                      Phone: {currentOrder.shippingAddress.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="mt-4">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mb-4 ">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(currentOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{formatCurrency(currentOrder.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatCurrency(currentOrder.tax)}</span>
                </div>

                {typeof currentOrder.discount === "number" &&
                  currentOrder.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(currentOrder.discount)}</span>
                    </div>
                  )}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(currentOrder.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mt-4 ">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                  </div>
                  <p className="text-gray-700 text-sm">
                    {currentOrder.paymentMethod || "Not specified"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Need help with your order? Contact our customer support team.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
            {/* <Link href="/orders">
              <Button variant="outline">View All Orders</Button>
            </Link> */}
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
