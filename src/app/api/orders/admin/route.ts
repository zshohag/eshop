// // /app/api/orders/admin/route.ts
// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/lib/mongodb";
// import Order from "@/models/Order";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import User from "@/models/User";

// export const GET = async () => {
//   await connectMongoDB();
//   const session = await getServerSession(authOptions);

//   if (!session || session.user.role !== 'admin') {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }

//   const orders = await Order.find().sort({ createdAt: -1 });
//   return NextResponse.json(orders);
// };

// // GET - Fetch all orders (Admin only)
// // export async function GET() {
// //   try {
// //     await connectMongoDB();

// //     const session = await getServerSession(authOptions);
// //     if (!session?.user?.email) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     // Check if user is admin (adjust this based on your admin check logic)
// //     const user = await User.findOne({ email: session.user.email });
// //     if (!user || !user.isAdmin) {
// //       return NextResponse.json(
// //         { error: "Admin access required" },
// //         { status: 403 }
// //       );
// //     }

// //     const orders = await Order.find({})
// //       .populate("user", "name email")
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     // Transform orders for frontend
// //     const transformedOrders = orders.map((order) => ({
// //       id: order.id,
// //       _id: order._id,
// //       user: order.user,
// //       items: order.items,
// //       total: order.total,
// //       subtotal: order.subtotal,
// //       tax: order.tax,
// //       shipping: order.shipping,
// //       discount: order.discount,
// //       shippingAddress: order.shippingAddress,
// //       paymentMethod: order.paymentMethod,
// //       estimatedDelivery: order.estimatedDelivery,
// //       status: order.status,
// //       createdAt: order.createdAt?.toISOString(),
// //       updatedAt: order.updatedAt?.toISOString(),
// //     }));

// //     return NextResponse.json(transformedOrders, { status: 200 });
// //   } catch (error) {
// //     console.error("Error fetching admin orders:", error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch orders" },
// //       { status: 500 }
// //     );
// //   }
// // }



/////////


// app/api/orders/admin/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import { authOptions } from "@/lib/auth";

// GET - Fetch all orders (Admin only)
export async function GET() {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin - using either role or isAdmin field
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check admin status - adjust based on your User model structure
    const isAdmin = user.role === 'admin' || user.isAdmin === true;
    if (!isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    // Transform orders for frontend
    const transformedOrders = orders.map(order => ({
      id: order.id,
      _id: order._id,
      user: order.user,
      items: order.items,
      total: order.total,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      discount: order.discount,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.estimatedDelivery,
      status: order.status,
      createdAt: order.createdAt?.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }));

    return NextResponse.json(transformedOrders, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}