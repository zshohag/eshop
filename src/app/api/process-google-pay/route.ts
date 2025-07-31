// api/process-google-pay/route.ts

// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { CartItem, ShippingAddress } from "@/types/types";

// // -------------------------------------------------------------
// // Add these Google Pay specific interfaces
// // You can put these in a separate types file (e.g., @/types/google-pay.d.ts)
// // or directly in this file if it's the only place they're used.

// interface GooglePayTokenizationData {
//   type: string;
//   token: string;
// }

// interface GooglePayPaymentMethodData {
//   description: string;
//   type: "CARD";
//   tokenizationData: GooglePayTokenizationData;
//   info?: {
//     cardDetails: string;
//     cardNetwork: string;
//     // Add other relevant properties you might use from info
//   };
// }

// interface GooglePayPaymentData {
//   apiVersion: number;
//   apiVersionMinor: number;
//   paymentMethodData: GooglePayPaymentMethodData;
//   // If you also need access to shipping address or email from paymentData directly,
//   // add them here, e.g.:
//   shippingAddress?: {
//     address1: string;
//     locality: string; // city
//     administrativeArea: string; // state
//     postalCode: string;
//     countryCode: string;
//     // ... more address details
//   };
//   email?: string;
// }
// // -------------------------------------------------------------
// // End of Google Pay specific interfaces
// // -------------------------------------------------------------

// interface OrderDetails {
//   email: string;
//   items: CartItem[];
//   shippingAddress: ShippingAddress;
// }

// interface RequestBody {
//   paymentToken: string; // Still here, but won't be directly used as a Stripe token
//   amount: number;
//   currency?: string;
//   paymentData: GooglePayPaymentData; // <<<< Changed from 'any' to specific type
//   orderDetails: OrderDetails;
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body: RequestBody = await request.json();
//     const { amount, currency = "usd", orderDetails, paymentData } = body;

//     // Type-safe access to paymentData.paymentMethodData
//     if (!paymentData || !paymentData.paymentMethodData || !amount || !orderDetails) {
//       return NextResponse.json(
//         { error: "কিছু প্রয়োজনীয় তথ্য নেই: paymentData, amount, বা orderDetails অনুপস্থিত।" },
//         { status: 400 }
//       );
//     }

//     // Access the token securely using the defined interface
//     const googlePayToken = paymentData.paymentMethodData.tokenizationData.token;

//     const paymentMethod = await stripe.paymentMethods.create({
//       type: "card",
//       card: {
//         token: googlePayToken, // Use the extracted token
//       },
//       billing_details: {
//         email: orderDetails.email,
//         address: {
//           city: orderDetails.shippingAddress.city,
//           state: orderDetails.shippingAddress.state,
//           country: orderDetails.shippingAddress.country,
//         }
//       }
//     });

//     // ... rest of your code remains the same
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency,
//         payment_method: paymentMethod.id,
//         confirmation_method: "automatic",
//         confirm: true,
//         return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation`,
//         metadata: {
//             payment_method: "google_pay",
//             customer_email: orderDetails.email,
//             order_items: JSON.stringify(
//                 orderDetails.items.map((item: CartItem) => ({
//                     id: item.id,
//                     name: item.name,
//                     quantity: item.quantity,
//                     price: item.price,
//                 }))
//             ),
//             shipping_address: JSON.stringify(orderDetails.shippingAddress),
//         },
//     });

//     if (paymentIntent.status === "succeeded") {
//         return NextResponse.json({
//             success: true,
//             message: "পেমেন্ট সফল হয়েছে!",
//             paymentIntent: {
//                 id: paymentIntent.id,
//                 status: paymentIntent.status,
//                 amount: paymentIntent.amount,
//                 currency: paymentIntent.currency,
//             },
//         });
//     } else if (paymentIntent.status === "requires_action") {
//         return NextResponse.json({
//             success: false,
//             error: "পেমেন্টের জন্য অতিরিক্ত অনুমোদনের প্রয়োজন",
//             requiresAction: true,
//             clientSecret: paymentIntent.client_secret,
//         });
//     } else {
//         return NextResponse.json({
//             success: false,
//             error: "পেমেন্ট সফল হয়নি",
//             status: paymentIntent.status,
//         });
//     }

//   } catch (error: unknown) {
//     console.error("Stripe Google Pay ত্রুটি:", error);

//     if (error instanceof Stripe.errors.StripeCardError) {
//       return NextResponse.json(
//         { success: false, error: error.message || "কার্ড প্রত্যাখ্যান করা হয়েছে" },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Stripe.errors.StripeInvalidRequestError) {
//       console.error("StripeInvalidRequestError এর বিস্তারিত:", error.raw);
//       return NextResponse.json(
//         { success: false, error: error.message || "ভুল Stripe অনুরোধ" },
//         { status: error.statusCode || 400 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: "পেমেন্টের সাথে কিছু ভুল হয়েছে।" },
//       { status: 500 }
//     );
//   }
// }

/////////////////22222

// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { CartItem, ShippingAddress } from "@/types/types";

// interface GooglePayTokenizationData {
//   type: string;
//   token: string;
// }

// interface GooglePayPaymentMethodData {
//   description: string;
//   type: "CARD";
//   tokenizationData: GooglePayTokenizationData;
//   info?: {
//     cardDetails: string;
//     cardNetwork: string;
//   };
// }

// interface GooglePayPaymentData {
//   apiVersion: number;
//   apiVersionMinor: number;
//   paymentMethodData: GooglePayPaymentMethodData;
//   shippingAddress?: {
//     address1: string;
//     locality: string;
//     administrativeArea: string;
//     postalCode: string;
//     countryCode: string;
//   };
//   email?: string;
// }

// interface OrderDetails {
//   email: string;
//   items: CartItem[];
//   shippingAddress: ShippingAddress;
// }

// interface RequestBody {
//   paymentToken: string;
//   amount: number;
//   currency?: string;
//   paymentData: GooglePayPaymentData;
//   orderDetails: OrderDetails;
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body: RequestBody = await request.json();
//     const { amount, currency = "usd", orderDetails, paymentData } = body;

//     // Validate required fields
//     if (
//       !paymentData ||
//       !paymentData.paymentMethodData ||
//       !amount ||
//       !orderDetails
//     ) {
//       return NextResponse.json(
//         {
//           error: "Missing required data: paymentData, amount, or orderDetails",
//         },
//         { status: 400 }
//       );
//     }

//     // Extract the Google Pay token
//     const googlePayToken = paymentData.paymentMethodData.tokenizationData.token;

//     if (!googlePayToken) {
//       return NextResponse.json(
//         { error: "Google Pay token is missing" },
//         { status: 400 }
//       );
//     }

//     // Parse the Google Pay token (it's usually a JSON string)
//     let tokenData;
//     try {
//       tokenData = JSON.parse(googlePayToken);
//     } catch (e) {
//       // If it's not JSON, treat it as a direct token
//       console.log(e);
//       tokenData = { id: googlePayToken };
//     }

//     // Create payment method using the token
//     const paymentMethod = await stripe.paymentMethods.create({
//       type: "card",
//       card: {
//         token: tokenData.id || googlePayToken, // Use the token ID
//       },
//       billing_details: {
//         email: orderDetails.email,
//         address: {
//           city: orderDetails.shippingAddress.city,
//           state: orderDetails.shippingAddress.state,
//           country: orderDetails.shippingAddress.country,
//         },
//       },
//     });

//     // Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       payment_method: paymentMethod.id,
//       confirmation_method: "automatic",
//       confirm: true,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation`,
//       metadata: {
//         payment_method: "google_pay",
//         customer_email: orderDetails.email,
//         order_items: JSON.stringify(
//           orderDetails.items.map((item: CartItem) => ({
//             id: item.id,
//             name: item.name,
//             quantity: item.quantity,
//             price: item.price,
//           }))
//         ),
//         shipping_address: JSON.stringify(orderDetails.shippingAddress),
//       },
//     });

//     if (paymentIntent.status === "succeeded") {
//       return NextResponse.json({
//         success: true,
//         message: "Payment successful!",
//         paymentIntent: {
//           id: paymentIntent.id,
//           status: paymentIntent.status,
//           amount: paymentIntent.amount,
//           currency: paymentIntent.currency,
//         },
//       });
//     } else if (paymentIntent.status === "requires_action") {
//       return NextResponse.json({
//         success: false,
//         requiresAction: true,
//         clientSecret: paymentIntent.client_secret,
//         paymentIntentId: paymentIntent.id,
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         error: "Payment was not successful",
//         status: paymentIntent.status,
//       });
//     }
//   } catch (error: unknown) {
//     console.error("Stripe Google Pay Error:", error);

//     if (error instanceof Stripe.errors.StripeCardError) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message || "Card was declined",
//           code: error.code,
//         },
//         { status: 400 }
//       );
//     }

//     if (error instanceof Stripe.errors.StripeInvalidRequestError) {
//       console.error("StripeInvalidRequestError details:", {
//         message: error.message,
//         param: error.param,
//         type: error.type,
//         code: error.code,
//       });

//       return NextResponse.json(
//         {
//           success: false,
//           error: error.message || "Invalid request to Stripe",
//           param: error.param,
//         },
//         { status: error.statusCode || 400 }
//       );
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Something went wrong with the payment processing.",
//       },
//       { status: 500 }
//     );
//   }
// }

/////////33

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem, ShippingAddress } from "@/types/types";

interface GooglePayTokenizationData {
  type: string;
  token: string;
}

interface GooglePayPaymentMethodData {
  description: string;
  type: "CARD";
  tokenizationData: GooglePayTokenizationData;
  info?: {
    cardDetails: string;
    cardNetwork: string;
  };
}

interface GooglePayPaymentData {
  apiVersion: number;
  apiVersionMinor: number;
  paymentMethodData: GooglePayPaymentMethodData;
  shippingAddress?: {
    address1: string;
    locality: string;
    administrativeArea: string;
    postalCode: string;
    countryCode: string;
  };
  email?: string;
}

interface OrderDetails {
  email: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
}

interface RequestBody {
  paymentToken: string;
  amount: number;
  currency?: string;
  paymentData: GooglePayPaymentData;
  orderDetails: OrderDetails;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { amount, currency = "usd", orderDetails, paymentData } = body;

    // Validate required fields
    if (
      !paymentData ||
      !paymentData.paymentMethodData ||
      !amount ||
      !orderDetails
    ) {
      return NextResponse.json(
        {
          error: "Missing required data: paymentData, amount, or orderDetails",
        },
        { status: 400 }
      );
    }

    // Extract the Google Pay token
    const googlePayToken = paymentData.paymentMethodData.tokenizationData.token;

    if (!googlePayToken) {
      return NextResponse.json(
        { error: "Google Pay token is missing" },
        { status: 400 }
      );
    }

    // Parse the Google Pay token (it's usually a JSON string)
    let tokenData;
    try {
      tokenData = JSON.parse(googlePayToken);
    } catch (e) {
      // If it's not JSON, treat it as a direct token
      tokenData = { id: googlePayToken };
      console.log(e);
    }

    // Create payment method using the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: tokenData.id || googlePayToken, // Use the token ID
      },
      billing_details: {
        email: orderDetails.email,
        address: {
          city: orderDetails.shippingAddress.city,
          state: orderDetails.shippingAddress.state,
          country: orderDetails.shippingAddress.country,
        },
      },
    });

    // Get the base URL with proper protocol
    const getBaseUrl = () => {
      if (process.env.NEXT_PUBLIC_BASE_URL) {
        const url = process.env.NEXT_PUBLIC_BASE_URL;
        // Check if URL already has a protocol
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }
        // Add https by default for production, http for localhost
        return url.includes("localhost") ? `http://${url}` : `https://${url}`;
      }

      // Fallback URLs
      if (process.env.NODE_ENV === "production") {
        return "https://your-domain.com"; // Replace with your actual domain
      }
      return "http://localhost:3000";
    };

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethod.id,
      confirmation_method: "automatic",
      confirm: true,
      return_url: `${getBaseUrl()}/order-confirmation`,
      metadata: {
        payment_method: "google_pay",
        customer_email: orderDetails.email,
        order_items: JSON.stringify(
          orderDetails.items.map((item: CartItem) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
        shipping_address: JSON.stringify(orderDetails.shippingAddress),
      },
    });

    if (paymentIntent.status === "succeeded") {
      return NextResponse.json({
        success: true,
        message: "Payment successful!",
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
      });
    } else if (paymentIntent.status === "requires_action") {
      return NextResponse.json({
        success: false,
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Payment was not successful",
        status: paymentIntent.status,
      });
    }
  } catch (error: unknown) {
    console.error("Stripe Google Pay Error:", error);

    if (error instanceof Stripe.errors.StripeCardError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Card was declined",
          code: error.code,
        },
        { status: 400 }
      );
    }

    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      console.error("StripeInvalidRequestError details:", {
        message: error.message,
        param: error.param,
        type: error.type,
        code: error.code,
      });

      return NextResponse.json(
        {
          success: false,
          error: error.message || "Invalid request to Stripe",
          param: error.param,
        },
        { status: error.statusCode || 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong with the payment processing.",
      },
      { status: 500 }
    );
  }
}
