// src/app/api/checkout/route.ts

import { CartItem } from "@/types/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { items, email }: { items: CartItem[]; email: string } = body;

    const line_items = items.map((item) => {
      // Handle image safely - filter out undefined values and provide fallback
      const imageUrl =
        item.images && item.images.length > 0 && item.images[0]
          ? item.images[0]
          : item.image ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/placeholder-image.jpg`;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [imageUrl], // ✅ Always provide a valid string
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error", error);
    return new NextResponse("Stripe Error", { status: 500 });
  }
}
