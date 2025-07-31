// components/CheckoutButton.tsx

"use client";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutButton() {
  const handleClick = async () => {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
    });

    const data = await res.json();

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return <button onClick={handleClick}>Pay with Stripe</button>;
}
