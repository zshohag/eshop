// // components/StripeCheckoutButton.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { CartItem } from "@/types/types";
// import { CreditCard } from "lucide-react";

// interface StripeCheckoutButtonProps {
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
//   loading: boolean;
//   total: number; // finalTotal from CheckoutPage
// }

// export default function StripeCheckoutButton({
//   items, // eslint-disable-line @typescript-eslint/no-unused-vars
//   email,
//   shippingAddress, // eslint-disable-line @typescript-eslint/no-unused-vars
//   onSuccessfulCheckout, // eslint-disable-line @typescript-eslint/no-unused-vars
//   loading,
//   total,
// }: StripeCheckoutButtonProps) {
//   const router = useRouter();

//   const handleStripeCheckout = async () => {
//     try {
//       const amountInCents = Math.round(total * 100); // Convert to cents
//       // Serialize items and shippingAddress for query parameters
//       const query = new URLSearchParams({
//         amount: amountInCents.toString(),
//         email: encodeURIComponent(email),
//         items: encodeURIComponent(JSON.stringify(items)),
//         shippingAddress: encodeURIComponent(JSON.stringify(shippingAddress)),
//       });
//       router.push(`/payment?${query.toString()}`);
//     } catch (error) {
//       console.error("Error initiating Stripe checkout:", error);
//     }
//   };

//   return (
//     <Button
//       className="w-full bg-black text-white py-3 text-lg flex items-center justify-center gap-2 hover:bg-gray-800"
//       onClick={handleStripeCheckout}
//       disabled={loading}
//     >
//       {loading ? (
//         "Processing..."
//       ) : (
//         <>
//           {/* <CreditCard className="w-4 h-4" />
//           Pay with Card - ${total.toFixed(2)} */}
//           <div className="flex items-center  ">
//             <span>Pay with Card</span>
//            <CreditCard className="w-4 h-4 ml-2 mr-2 " />
//             <span>${total.toFixed(2)}</span>
//           </div>
//         </>
//       )}
//     </Button>
//   );
// }

////////

// components/StripeCheckoutButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/types";
import { CreditCard } from "lucide-react";

interface StripeCheckoutButtonProps {
  items: CartItem[];
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  onSuccessfulCheckout: () => Promise<void>;
  loading: boolean;
  total: number; // finalTotal from CheckoutPage
}

export default function StripeCheckoutButton({
  items,
  email,
  shippingAddress,
  onSuccessfulCheckout, // eslint-disable-line @typescript-eslint/no-unused-vars
  loading,
  total,
}: StripeCheckoutButtonProps) {
  const router = useRouter();

  const handleStripeCheckout = async () => {
    try {
      const amountInCents = Math.round(total * 100); // Convert to cents
      // Serialize items and shippingAddress for query parameters
      const query = new URLSearchParams({
        amount: amountInCents.toString(),
        email: encodeURIComponent(email),
        items: encodeURIComponent(JSON.stringify(items)),
        shippingAddress: encodeURIComponent(JSON.stringify(shippingAddress)),
      });
      router.push(`/payment?${query.toString()}`);
    } catch (error) {
      console.error("Error initiating Stripe checkout:", error);
    }
  };

  return (
    <Button
      className="w-full bg-black text-white py-3 text-lg flex items-center justify-center gap-2 hover:bg-gray-800"
      onClick={handleStripeCheckout}
      disabled={loading}
    >
      {loading ? (
        "Processing..."
      ) : (
        <>
          <div className="flex items-center">
            <span>Pay with Card</span>
            <CreditCard className="w-4 h-4 ml-2 mr-2" />
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </Button>
  );
}