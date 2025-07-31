import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectMongoDB } from "@/lib/mongodb";

// Define a type for the context object with Promise-based params
interface Context {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single order
export async function GET(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();
    const { id } = await context.params; // Await the params Promise
    const order = await Order.findOne({ _id: id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

// PATCH - Update order status
export async function PATCH(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();

    const { id } = await context.params; // Await the params Promise
    const body = await request.json();
    const { status } = body;

    const order = await Order.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}

// DELETE - Delete order
export async function DELETE(request: NextRequest, context: Context) {
  try {
    await connectMongoDB();

    const { id } = await context.params; // Await the params Promise
    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
