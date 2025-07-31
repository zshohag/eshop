// src/app/payment/page.tsx

"use client"; 
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState, Suspense } from "react"; // Import Suspense
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/redux";
import { createOrder } from "@/lib/store/slices/orderSlice";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Item {
  id: string;
  name: string;
  images: string[];
  price: number;
  quantity: number;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// This is the new component that will contain all the logic
// that uses client-side hooks like useSearchParams.
const PaymentContent = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams(); // This hook is now safely inside PaymentContent
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the Stripe publishable key is available
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      setError("Stripe publishable key is missing.");
      setLoading(false);
      return;
    }

    // Check if user is logged in
    if (!session) {
      setError("Please log in to complete payment.");
      setLoading(false);
      return;
    }

    // Extract necessary data from URL search parameters
    const amount = parseInt(searchParams.get("amount") || "0", 10);
    const email = searchParams.get("email") || "";
    const items = searchParams.get("items")
      ? JSON.parse(decodeURIComponent(searchParams.get("items")!))
      : [];
    const shippingAddress = searchParams.get("shippingAddress")
      ? JSON.parse(decodeURIComponent(searchParams.get("shippingAddress")!))
      : null;

    // Validate extracted data
    if (!amount || amount <= 0) {
      setError("Invalid payment amount.");
      setLoading(false);
      return;
    }

    if (!email || !items.length || !shippingAddress) {
      setError("Missing required payment information.");
      setLoading(false);
      return;
    }

    // Function to fetch the client secret from your API
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, currency: "usd" }),
        });
        console.log("API Response status:", response.status);
        const data = await response.json();
        console.log("API Response data:", data);
        if (!response.ok) {
          throw new Error(
            data.error ||
              `Failed to fetch client secret (status: ${response.status})`
          );
        }
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned from the server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchClientSecret();
  }, [searchParams, session]); // Dependencies for useEffect

  // Function to handle successful payment and create the order
  const handlePaymentSuccess = async () => {
    try {
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      // Re-parse data from searchParams as they might be needed again
      const items: Item[] = JSON.parse(
        decodeURIComponent(searchParams.get("items")!)
      );
      const shippingAddress = JSON.parse(
        decodeURIComponent(searchParams.get("shippingAddress")!)
      );
      const email = decodeURIComponent(searchParams.get("email") || "");

      console.log("Payment success - processing data:");
      console.log("Items:", items);
      console.log("Shipping Address:", shippingAddress);
      console.log("Email:", email);

      // Calculate order totals
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shipping = subtotal > 50 ? 0 : 9.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      // Transform items for the backend (if your backend expects 'image' not 'images')
      const transformedItems = items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.images[0] || "", // Use the first image for the 'image' field if needed by backend
        images: item.images, // Keep 'images' for frontend consistency if needed
        quantity: item.quantity,
        inStock: true, // Assuming items are in stock for an order being placed
      }));

      // Prepare order data for Redux action
      const orderData = {
        items: transformedItems,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: {
          firstName:
            shippingAddress.firstName ||
            session.user?.name?.split(" ")[0] ||
            "Not Provided",
          lastName:
            shippingAddress.lastName ||
            session.user?.name?.split(" ")[1] ||
            "Not Provided",
          email: email || session.user.email || "",
          phone: shippingAddress.phone || "Not Provided",
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        paymentMethod: "credit_card",
        status: "pending" as const, // Set initial status
      };

      console.log("Creating order with data:", orderData);

      // Dispatch action to create the order in your backend via Redux
      const result = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order created successfully:", result);

      // Clear the cart and show success toast
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      // Redirect to order confirmation page
      router.push(`/order-confirmation/${result.id}`);
    } catch (error) {
      console.error("Order creation failed after Stripe:", error);
      toast.error(
        "Failed to finalize order after payment. Please contact support."
      );
    }
  };

  // Render authentication message if user is not logged in
  if (!session) {
    return (
      <div className="p-10">
        <h2 className="text-xl mb-4">Authentication Required</h2>
        <p className="text-red-500">Please log in to complete your payment.</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Main rendering of the payment form
  return (
    <div className="p-10 max-w-7xl w-full ">
      {/* <h2 className="text-xl mb-4">Pay with Card</h2> */}
      {loading && <p>Loading payment form...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {clientSecret && stripePromise && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}
    </div>
  );
};

// This is the main page component that Next.js will render.
// It uses Suspense to defer the rendering of PaymentContent
// until the client-side environment is ready.
const PaymentPage = () => {
  return (
    // Wrap PaymentContent with Suspense.
    // The 'fallback' prop will be shown while PaymentContent is loading
    // or when it's being rendered on the server before client-side hydration.
    <Suspense fallback={<div>Loading payment information...</div>}>
      <PaymentContent />
    </Suspense>
  );
};

export default PaymentPage;
