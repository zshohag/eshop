// app/checkout/page.tsx 
"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { createOrder } from "@/lib/store/slices/orderSlice";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import PaymentMethods from "@/components/Payment-methods";
import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import EmptyCart from "@/components/checkout/EmptyCart";
import { useCheckoutForm } from "@/lib/hooks/useCheckoutForm";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);
  const { loading } = useAppSelector((state) => state.order);

  const {
    formData,
    errors,
    validateForm,
    handleInputChange,
    handlePaymentMethodChange,
  } = useCheckoutForm();

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const createOrderData = () => ({
    items,
    subtotal: total,
    tax,
    shipping,
    total: finalTotal,
    shippingAddress: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    },
    paymentMethod: formData.paymentMethod,
  });

  const handleSuccessfulCheckout = async (orderId?: string) => {
    try {
      if (orderId) {
        // For Google Pay and other methods that return orderId
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${orderId}`);
      } else {
        // For Stripe checkout
        const orderData = {
          ...createOrderData(),
          paymentMethod: "stripe_success",
        };

        const result = await dispatch(createOrder(orderData)).unwrap();
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        router.push(`/order-confirmation/${result.id}`);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to finalize order. Please contact support.");
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (formData.paymentMethod === "google_pay" || formData.paymentMethod === "credit_card") {
      return; // These are handled by their respective components
    }

    try {
      const orderData = createOrderData();
      const result = await dispatch(createOrder(orderData)).unwrap();
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation/${result.id}`);
      dispatch(clearCart());
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ShippingForm
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
            />

            <PaymentMethods
              selectedPaymentMethod={formData.paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
          </div>

          <div>
            <OrderSummary
              items={items}
              itemCount={itemCount}
              total={total}
              shipping={shipping}
              tax={tax}
              finalTotal={finalTotal}
              paymentMethod={formData.paymentMethod}
              formData={formData}
              loading={loading}
              validateForm={validateForm}
              onSuccessfulCheckout={handleSuccessfulCheckout}
              onSubmit={() => handleSubmit()}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
