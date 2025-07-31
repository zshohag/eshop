// // components/CheckoutForm.tsx
// "use client";

// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";

// interface Props {
//   clientSecret: string;
//   onPaymentSuccess: () => Promise<void>;
// }

// const CheckoutForm: React.FC<Props> = ({ clientSecret, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [processingOrder, setProcessingOrder] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setProcessingOrder(false);

//     if (!stripe || !elements) {
//       setError("Stripe is not loaded properly");
//       setLoading(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError("Card element not found");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Confirming card payment...");
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (result.error) {
//         console.error("Payment failed:", result.error);
//         setError(result.error.message || "Payment failed");
//       } else if (result.paymentIntent?.status === "succeeded") {
//         console.log("Payment successful, creating order...");
//         setSuccess(true);
//         setProcessingOrder(true);

//         try {
//           await onPaymentSuccess();
//           console.log("Order creation completed successfully");
//         } catch (orderError) {
//           console.error("Order creation failed:", orderError);
//           setError("Payment successful but order creation failed. Please contact support with your payment confirmation.");
//           setSuccess(false);
//         } finally {
//           setProcessingOrder(false);
//         }
//       } else {
//         console.log("Payment status:", result.paymentIntent?.status);
//         setError("Payment was not completed successfully");
//       }
//     } catch (err) {
//       console.error("Error during payment process:", err);
//       setError("An unexpected error occurred during payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md p-4 shadow-md bg-white rounded">
//       <div className="border p-3 rounded mb-4">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#32325d",
//                 "::placeholder": { color: "#a0aec0" },
//               },
//               invalid: { color: "#e53e3e" },
//             },
//           }}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || loading || success}
//         className={`mt-2 w-full py-2 rounded text-white ${
//           success
//             ? "bg-green-600"
//             : loading
//             ? "bg-gray-400"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {processingOrder
//           ? "Creating Order..."
//           : loading
//           ? "Processing Payment..."
//           : success
//           ? "Order Processing..."
//           : "Pay Now"
//         }
//       </button>

//       {error && (
//         <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
//           {error}
//         </div>
//       )}

//       {success && !processingOrder && (
//         <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
//           Payment successful! Redirecting to confirmation page...
//         </div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

// ////////   need update

// "use client";

// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// interface Props {
//   clientSecret: string;
//   onPaymentSuccess: () => Promise<void>;
// }

// const CheckoutForm: React.FC<Props> = ({ clientSecret, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [processingOrder, setProcessingOrder] = useState(false);
//   const [cardBrand, setCardBrand] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setProcessingOrder(false);

//     if (!stripe || !elements) {
//       setError("Stripe is not loaded properly");
//       setLoading(false);
//       return;
//     }

//     const cardNumberElement = elements.getElement(CardNumberElement);
//     if (!cardNumberElement) {
//       setError("Card number element not found");
//       setLoading(false);
//       return;
//     }

//     try {
//       console.log("Confirming card payment...");
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardNumberElement,
//         },
//       });

//       if (result.error) {
//         console.error("Payment failed:", result.error);
//         setError(result.error.message || "Payment failed");
//       } else if (result.paymentIntent?.status === "succeeded") {
//         console.log("Payment successful, creating order...");
//         setSuccess(true);
//         setProcessingOrder(true);

//         try {
//           await onPaymentSuccess();
//           console.log("Order creation completed successfully");
//         } catch (orderError) {
//           console.error("Order creation failed:", orderError);
//           setError(
//             "Payment successful but order creation failed. Please contact support with your payment confirmation."
//           );
//           setSuccess(false);
//         } finally {
//           setProcessingOrder(false);
//         }
//       } else {
//         console.log("Payment status:", result.paymentIntent?.status);
//         setError("Payment was not completed successfully");
//       }
//     } catch (err) {
//       console.error("Error during payment process:", err);
//       setError("An unexpected error occurred during payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle card brand detection
//   useEffect(() => {
//     if (!elements) return;

//     const cardNumberElement = elements.getElement(CardNumberElement);
//     if (cardNumberElement) {
//       cardNumberElement.on("change", (event) => {
//         if (event.brand) {
//           setCardBrand(event.brand);
//         } else {
//           setCardBrand(null);
//         }
//       });
//     }

//     return () => {
//       if (cardNumberElement) {
//         cardNumberElement.off("change");
//       }
//     };
//   }, [elements]);

//   const elementOptions = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#1a202c",
//         fontFamily: "'Inter', sans-serif",
//         fontSmoothing: "antialiased",
//         "::placeholder": {
//           color: "#a0aec0",
//         },
//       },
//       invalid: {
//         color: "#e53e3e",
//         iconColor: "#e53e3e",
//       },
//     },
//     showIcon: true, // Enable card brand icon
//     iconStyle: "solid" as const, // Fix: Use 'as const' to ensure proper typing
//   };

//   // Updated card brand icons with real image URLs
//   const cardBrandToIcon: { [key: string]: string } = {
//     visa: "https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg",
//     mastercard:
//       "https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg",
//     amex: "https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg",
//     discover:
//       "https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg",
//     diners:
//       "https://js.stripe.com/v3/fingerprinted/img/diners-fbfea7c2dd73f4aabaad20217b96591a.svg",
//     jcb: "https://js.stripe.com/v3/fingerprinted/img/jcb-271fd06e6e7a2c52692ffa91a95fb64f.svg",
//     unionpay:
//       "https://js.stripe.com/v3/fingerprinted/img/unionpay-8a10aefc7295216c338ba4e543685573.svg",
//     unknown:
//       "https://js.stripe.com/v3/fingerprinted/img/unknown-40f20a8057b20df56d1fa88b4f58858e.svg",
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-lg"
//     >
//       <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
//         Secure Payment
//       </h2>

//       <div className="space-y-4">
//         <div className="relative">
//           <label
//             htmlFor="card-number"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Card Number
//           </label>
//           <div className="relative border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
//             <CardNumberElement
//               id="card-number"
//               options={elementOptions}
//               className="w-full pr-10" // Add padding-right to accommodate icon
//             />
//             {cardBrand && (
//               <Image
//                 src={cardBrandToIcon[cardBrand] || cardBrandToIcon["unknown"]}
//                 alt={`${cardBrand} icon`}
//                 width={32}
//                 height={24}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//               />
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label
//               htmlFor="card-expiry"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Expiry Date
//             </label>
//             <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
//               <CardExpiryElement
//                 id="card-expiry"
//                 options={elementOptions}
//                 className="w-full"
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="card-cvc"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               CVC
//             </label>
//             <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
//               <CardCvcElement
//                 id="card-cvc"
//                 options={elementOptions}
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || loading || success}
//         className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
//           success
//             ? "bg-green-600"
//             : loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {processingOrder
//           ? "Creating Order..."
//           : loading
//           ? "Processing Payment..."
//           : success
//           ? "Order Processing..."
//           : "Pay Now"}
//       </button>

//       {error && (
//         <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
//           {error}
//         </div>
//       )}

//       {success && !processingOrder && (
//         <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
//           Payment successful! Redirecting to confirmation page...
//         </div>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

// //////  NEW UPDATED

"use client";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface Props {
  clientSecret: string;
  onPaymentSuccess: () => Promise<void>;
}

const CheckoutForm: React.FC<Props> = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProcessingOrder(false);

    if (!stripe || !elements) {
      setError("Stripe is not loaded properly");
      setLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError("Card number element not found");
      setLoading(false);
      return;
    }

    try {
      console.log("Confirming card payment...");
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error);
        setError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment successful, creating order...");
        setSuccess(true);
        setProcessingOrder(true);

        try {
          await onPaymentSuccess();
          console.log("Order creation completed successfully");
        } catch (orderError) {
          console.error("Order creation failed:", orderError);
          setError(
            "Payment successful but order creation failed. Please contact support with your payment confirmation."
          );
          setSuccess(false);
        } finally {
          setProcessingOrder(false);
        }
      } else {
        console.log("Payment status:", result.paymentIntent?.status);
        setError("Payment was not completed successfully");
      }
    } catch (err) {
      console.error("Error during payment process:", err);
      setError("An unexpected error occurred during payment");
    } finally {
      setLoading(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1a202c",
        fontFamily: "'Inter', sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#a0aec0",
        },
      },
      invalid: {
        color: "#e53e3e",
        iconColor: "#e53e3e",
      },
    },
    showIcon: true,
    iconStyle: "solid" as const,
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        Secure Payment
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <label
            htmlFor="card-number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Card Number
          </label>
          <div className="relative border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
            <CardNumberElement
              id="card-number"
              options={elementOptions}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="card-expiry"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Date
            </label>
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <CardExpiryElement
                id="card-expiry"
                options={elementOptions}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="card-cvc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CVC
            </label>
            <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
              <CardCvcElement
                id="card-cvc"
                options={elementOptions}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading || success}
        className={`mt-6 w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
          success
            ? "bg-green-600"
            : loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processingOrder
          ? "Creating Order..."
          : loading
          ? "Processing Payment..."
          : success
          ? "Order Processing..."
          : "Pay Now"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && !processingOrder && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          Payment successful! Redirecting to confirmation page...
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
