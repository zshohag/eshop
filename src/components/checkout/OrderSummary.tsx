// // components/checkout/OrderSummary.tsx
// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Shield, Lock } from "lucide-react";
// import OrderItem from "./OrderItem";
// import StripeCheckoutButton from "@/components/StripeCheckoutButton";
// import GooglePayButton from "@/components/GooglePayButton";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   images?: string[];
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   paymentMethod: string;
// }

// interface OrderSummaryProps {
//   items: CartItem[];
//   itemCount: number;
//   total: number;
//   shipping: number;
//   tax: number;
//   finalTotal: number;
//   paymentMethod: string;
//   formData: FormData;
//   loading: boolean;
//   validateForm: () => boolean;
//   onSuccessfulCheckout: (orderId?: string) => Promise<void>;
//   onSubmit: () => void;
// }

// export default function OrderSummary({
//   items,
//   itemCount,
//   total,
//   shipping,
//   tax,
//   finalTotal,
//   paymentMethod,
//   formData,
//   loading,
//   validateForm,
//   onSuccessfulCheckout,
//   onSubmit
// }: OrderSummaryProps) {
//   return (
//     <Card className="sticky top-6">
//       <CardHeader>
//         <CardTitle className="mt-4">Order Summary</CardTitle>
//       </CardHeader>
//       <CardContent className="mb-4">
//         <div className="space-y-3 mb-6">
//           {items.map((item) => (
//             <OrderItem key={item.id} item={item} />
//           ))}
//         </div>

//         <div className="space-y-2 mb-6 pt-4 border-t">
//           <div className="flex justify-between text-sm">
//             <span>Subtotal ({itemCount} items)</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Shipping</span>
//             <span>
//               {shipping === 0 ? (
//                 <span className="text-green-600">Free</span>
//               ) : (
//                 `$${shipping.toFixed(2)}`
//               )}
//             </span>
//           </div>
//           <div className="flex justify-between text-sm">
//             <span>Tax</span>
//             <span>${tax.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between text-lg font-bold pt-2 border-t">
//             <span>Total</span>
//             <span>${finalTotal.toFixed(2)}</span>
//           </div>
//         </div>

//         {paymentMethod === "credit_card" ? (
//           <StripeCheckoutButton
//             items={items}
//             email={formData.email}
//             shippingAddress={{
//               address: formData.address,
//               city: formData.city,
//               state: formData.state,
//               zipCode: formData.zipCode,
//               country: formData.country,
//             }}
//             onSuccessfulCheckout={() => onSuccessfulCheckout()}
//             loading={loading}
//             total={finalTotal}
//           />
//         ) : paymentMethod === "google_pay" ? (
//           <GooglePayButton
//             items={items}
//             total={finalTotal}
//             formData={formData}
//             validateForm={validateForm}
//             onSuccessfulCheckout={(orderId: string) => onSuccessfulCheckout(orderId)}
//             loading={loading}
//           />
//         ) : (
//           <Button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
//             disabled={loading}
//             onClick={onSubmit}
//           >
//             {loading ? (
//               "Processing..."
//             ) : (
//               <>
//                 <Lock className="w-5 h-5 mr-2" />
//                 Place Order - ${finalTotal.toFixed(2)}
//               </>
//             )}
//           </Button>
//         )}

//         <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
//           <Shield className="w-4 h-4 text-green-500" />
//           <span>Secure SSL Encrypted Checkout</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// components/checkout/OrderSummary.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield } from "lucide-react";
import OrderItem from "./OrderItem";
import StripeCheckoutButton from "@/components/StripeCheckoutButton";
import GooglePayButton from "@/components/GooglePayButton";
import { PayPalCheckoutButton } from "../PayPalCheckoutButton";
import { Button } from "../ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  itemCount: number;
  total: number;
  shipping: number;
  tax: number;
  finalTotal: number;
  paymentMethod: string;
  formData: FormData;
  loading: boolean;
  validateForm: () => boolean;
  onSuccessfulCheckout: (orderId?: string) => Promise<void>;
  onSubmit: () => Promise<void>;
}

export default function OrderSummary({
  items,
  itemCount,
  total,
  shipping,
  tax,
  finalTotal,
  paymentMethod,
  formData,
  loading,
  validateForm,
  onSuccessfulCheckout,
  onSubmit,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="mt-4">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="mb-4">
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>

        <div className="space-y-2 mb-6 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({itemCount} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {paymentMethod === "credit_card" ? (
          <StripeCheckoutButton
            items={items}
            email={formData.email}
            shippingAddress={{
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country,
            }}
            onSuccessfulCheckout={() => onSuccessfulCheckout()}
            loading={loading}
            total={finalTotal}
          />
        ) : paymentMethod === "google_pay" ? (
          <GooglePayButton
            items={items}
            total={finalTotal}
            formData={formData}
            validateForm={validateForm}
            onSuccessfulCheckout={(orderId: string) =>
              onSuccessfulCheckout(orderId)
            }
            loading={loading}
          />
        ) : paymentMethod === "paypal" ? (
          <PayPalCheckoutButton items={items} total={finalTotal} />
        ) : (
          <Button
            type="submit"
            className="w-full bg-black text-white py-3 text-lg"
            disabled={loading}
            onClick={onSubmit}
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Place Order - ${finalTotal.toFixed(2)}
              </>
            )}
          </Button>
        )}

        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure SSL Encrypted Checkout</span>
        </div>
      </CardContent>
    </Card>
  );
}
