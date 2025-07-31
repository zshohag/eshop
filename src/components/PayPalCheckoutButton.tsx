// "use client";

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useState } from "react";
// import { toast } from "sonner";
// import { CartItem } from "@/types/types";

// interface PayPalCheckoutButtonProps {
//   items: CartItem[];
//   email: string;
//   shippingAddress: {
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   };
//   onSuccessfulCheckout: () => Promise<void>;
//   total: number;
//   loading: boolean;
// }

// export default function PayPalCheckoutButton({
//   items,
//   email,
//   shippingAddress,
//   onSuccessfulCheckout,
//   total,
//   loading,
// }: PayPalCheckoutButtonProps) {
//   const [isPaying, setIsPaying] = useState(false);

//   // PayPal Sandbox Test Client ID (you can use this for testing)
//   const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
//     "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CU3TkVbuBQ4NcEJl";

//   const paypalScriptOptions = {
//     clientId: PAYPAL_CLIENT_ID,
//     currency: "USD",
//     intent: "capture",
//     // Enable sandbox mode for testing
//     ...(process.env.NODE_ENV === 'development' && {
//       "enable-funding": "venmo,paylater",
//       "disable-funding": "credit,card"
//     })
//   };

//   return (
//     <div className="w-full">
//       <PayPalScriptProvider options={paypalScriptOptions}>
//         <PayPalButtons
//           style={{
//             layout: "vertical",
//             color: "gold",
//             shape: "rect",
//             label: "paypal",
//             tagline: false,
//             height: 45
//           }}
//           createOrder={async (data, actions) => {
//             try {
//               console.log("Creating PayPal order with total:", total);

//               return await actions.order.create({
//                 intent: "CAPTURE",
//                 purchase_units: [
//                   {
//                     reference_id: `order_${Date.now()}`,
//                     amount: {
//                       currency_code: "USD",
//                       value: total.toFixed(2),
//                       breakdown: {
//                         item_total: {
//                           currency_code: "USD",
//                           value: items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
//                         }
//                       }
//                     },
//                     items: items.map(item => ({
//                       name: item.name,
//                       unit_amount: {
//                         currency_code: "USD",
//                         value: item.price.toFixed(2)
//                       },
//                       quantity: item.quantity.toString(),
//                       category: "PHYSICAL_GOODS"
//                     })),
//                     shipping: {
//                       name: {
//                         full_name: `${shippingAddress.city} Resident`
//                       },
//                       address: {
//                         address_line_1: shippingAddress.address,
//                         admin_area_2: shippingAddress.city,
//                         admin_area_1: shippingAddress.state,
//                         postal_code: shippingAddress.zipCode,
//                         country_code: shippingAddress.country
//                       }
//                     }
//                   }
//                 ],
//                 payer: {
//                   email_address: email
//                 },
//                 application_context: {
//                   brand_name: "ShopHub",
//                   locale: "en-US",
//                   user_action: "PAY_NOW",
//                   return_url: `${window.location.origin}/order-confirmation`,
//                   cancel_url: `${window.location.origin}/checkout`
//                 }
//               });
//             } catch (error) {
//               console.error("Error creating PayPal order:", error);
//               toast.error("Failed to create PayPal order");
//               throw error;
//             }
//           }}
//           onApprove={async (data, actions) => {
//             setIsPaying(true);
//             try {
//               console.log("PayPal approval data:", data);

//               if (!actions.order) {
//                 throw new Error("No order actions available");
//               }

//               const details = await actions.order.capture();
//               console.log("✅ PayPal Payment Captured:", details);

//               // Verify the payment was successful
//               if (details.status === "COMPLETED") {
//                 toast.success("PayPal payment completed successfully!");
//                 await onSuccessfulCheckout();
//               } else {
//                 toast.error("PayPal payment was not completed");
//                 console.error("Payment not completed:", details.status);
//               }

//             } catch (error) {
//               console.error("❌ PayPal capture error:", error);
//               toast.error("Failed to process PayPal payment");
//             } finally {
//               setIsPaying(false);
//             }
//           }}
//           onCancel={(data) => {
//             console.log("PayPal payment cancelled:", data);
//             toast.error("PayPal payment was cancelled");
//             setIsPaying(false);
//           }}
//           onError={(err) => {
//             console.error("❌ PayPal Error:", err);
//             toast.error("PayPal payment error occurred");
//             setIsPaying(false);
//           }}
//           disabled={loading || isPaying}
//         />

//         {/* Loading state overlay */}
//         {(loading || isPaying) && (
//           <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded">
//             <div className="text-sm text-gray-600">
//               {isPaying ? "Processing payment..." : "Loading..."}
//             </div>
//           </div>
//         )}
//       </PayPalScriptProvider>
//     </div>
//   );
// }

//

// "use client";

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// interface PayPalCheckoutButtonProps {
//   total: number;
//   onSuccessRedirect?: string; // optional redirect
// }

// export default function PayPalCheckoutButton({
//   total,
//   onSuccessRedirect = "/order-confirmation", // default
// }: PayPalCheckoutButtonProps) {
//   const [isPaying, setIsPaying] = useState(false);
//   const router = useRouter();

//   return (
//     <PayPalScriptProvider
//       options={{
//         clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
//         currency: "USD",
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: "vertical", label: "paypal" }}
//         createOrder={(_, actions) => {
//           return actions.order.create({
//             intent: "CAPTURE", // ✅ required!
//             purchase_units: [
//               {
//                 amount: {
//                   currency_code: "USD",
//                   value: total.toFixed(2),
//                 },
//               },
//             ],
//             application_context: {
//               shipping_preference: "NO_SHIPPING",
//             },
//           });
//         }}
//         onApprove={async (_, actions) => {
//           setIsPaying(true);
//           try {
//             const details = await actions.order?.capture();
//             console.log("✅ PayPal Payment Success:", details);
//             toast.success("PayPal Payment Successful!");

//             // ✅ redirect
//             router.push(onSuccessRedirect);
//           } catch (err) {
//             toast.error("Payment capture failed.");
//           } finally {
//             setIsPaying(false);
//           }
//         }}
//         onError={(err) => {
//           console.error("❌ PayPal Error", err);
//           toast.error("PayPal payment error!");
//         }}
//         disabled={isPaying}
//       />
//     </PayPalScriptProvider>
//   );
// }

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { CartItem } from "@/types/types";

const ERROR_MESSAGES = [
  "Sorry! Something went wrong with the PayPal service. Please try again in a few minutes.",
  "Payment failed due to a system issue. Our team has been notified.",
  "Sorry, a system error occurred. We're working on a fix. Please try again soon.",
  "PayPal service is currently unavailable. Try another payment method.",
  "Transaction failed due to unknown error. Please try again later.",
  "Oops! Something went wrong. Try again or choose a different option.",
];

interface PayPalCheckoutButtonProps {
  items: CartItem[];
  total: number;
}

export const PayPalCheckoutButton = ({ total }: PayPalCheckoutButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayPalClick = async () => {
    setLoading(true);

    // Simulate 5-second delay
    setTimeout(() => {
      setLoading(false);
      const randomError =
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
      toast.error(randomError);
    }, 5000);
  };

  return (
    <Button
      onClick={handlePayPalClick}
      disabled={loading}
      className="w-full bg-black  text-white font-semibold "
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing with PayPal...
        </>
      ) : (
        `Pay with PayPal – $${total.toFixed(2)}`
      )}
    </Button>
  );
};
