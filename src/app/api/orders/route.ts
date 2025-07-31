// // app/api/orders/route.ts


// new try   work .....

// app/api/orders/route.ts


// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { connectMongoDB } from "@/lib/mongodb";
// import Order from "@/models/Order"; // Adjust the path to your Order model
// import User from "@/models/User"; // Adjust the path to your User model
// import { v4 as uuidv4 } from "uuid";
// import { authOptions } from "@/lib/auth";
// export async function POST(request: NextRequest) {
//   try {
//     console.log("Starting order creation...");
//     await connectMongoDB();
//     console.log("MongoDB connected");

//     const session = await getServerSession(authOptions);
//     console.log("Session:", session?.user?.email);
    
//     if (!session?.user?.email) {
//       console.log("No authenticated user");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       console.log("User not found in database");
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     console.log("User found:", user._id);

//     const body = await request.json();
//     console.log("Request body:", body);
    
//     const { items, subtotal, tax, shipping, total, shippingAddress, paymentMethod } = body;

//     // Validate required fields
//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return NextResponse.json({ error: "Items are required" }, { status: 400 });
//     }
//     if (!shippingAddress) {
//       return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
//     }
//     if (typeof total !== 'number' || total <= 0) {
//       return NextResponse.json({ error: "Valid total amount is required" }, { status: 400 });
//     }

//     // Validate required shipping address fields
//     const requiredFields = ['address', 'city', 'state', 'zipCode', 'country'];
//     const missingFields = requiredFields.filter(field => !shippingAddress[field] || shippingAddress[field].trim() === '');
    
//     if (missingFields.length > 0) {
//       return NextResponse.json({ 
//         error: `Missing required shipping address fields: ${missingFields.join(', ')}` 
//       }, { status: 400 });
//     }

//     // Calculate total if not provided or validate it
//     const calculatedTotal = (subtotal || 0) + (tax || 0) + (shipping || 0);
//     const finalTotal = total || calculatedTotal;

//     const orderId = uuidv4();
//     const orderData = {
//       id: orderId,
//       user: user._id, // Associate order with user
//       items: items.map(item => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         originalPrice: item.originalPrice,
//         image: item.image,
//         quantity: item.quantity,
//         inStock: item.inStock !== undefined ? item.inStock : true,
//         category: item.category || '',
//       })),
//       total: finalTotal,
//       subtotal: subtotal || 0,
//       tax: tax || 0,
//       shipping: shipping || 0,
//       discount: body.discount || 0,
//       shippingAddress: {
//         firstName: shippingAddress.firstName || 'Not Provided',
//         lastName: shippingAddress.lastName || 'Not Provided',
//         email: shippingAddress.email || session.user.email,
//         phone: shippingAddress.phone || 'Not Provided',
//         address: shippingAddress.address,
//         city: shippingAddress.city,
//         state: shippingAddress.state,
//         zipCode: shippingAddress.zipCode,
//         country: shippingAddress.country,
//       },
//       paymentMethod: paymentMethod || "credit_card",
//       estimatedDelivery: body.estimatedDelivery,
//       status: "pending",
//     };

//     console.log("Creating order with data:", orderData);

//     const order = new Order(orderData);
//     const savedOrder = await order.save();
//     console.log("Order saved successfully:", savedOrder._id);

//     // Transform the response to match frontend expectations
//     const responseOrder = {
//       id: savedOrder.id,
//       _id: savedOrder._id,
//       user: savedOrder.user,
//       items: savedOrder.items,
//       total: savedOrder.total,
//       subtotal: savedOrder.subtotal,
//       tax: savedOrder.tax,
//       shipping: savedOrder.shipping,
//       discount: savedOrder.discount,
//       shippingAddress: savedOrder.shippingAddress,
//       paymentMethod: savedOrder.paymentMethod,
//       estimatedDelivery: savedOrder.estimatedDelivery,
//       status: savedOrder.status,
//       createdAt: savedOrder.createdAt?.toISOString(),
//       updatedAt: savedOrder.updatedAt?.toISOString(),
//     };

//     return NextResponse.json(responseOrder, { status: 201 });
//   } catch (error) {
//     console.error("Error creating order:", error);
    
//     // Provide more specific error information
//     if (error instanceof Error) {
//       console.error("Error message:", error.message);
//       console.error("Error stack:", error.stack);
//     }
    
//     return NextResponse.json(
//       { 
//         error: "Failed to create order",
//         details: error instanceof Error ? error.message : "Unknown error"
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET - Fetch user's orders
// export async function GET() {
//   try {
//     await connectMongoDB();

//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const orders = await Order.find({ user: user._id })
//       .sort({ createdAt: -1 }) // Most recent first
//       .lean();

//     // Transform orders for frontend
//     const transformedOrders = orders.map(order => ({
//       id: order.id,
//       _id: order._id,
//       items: order.items,
//       total: order.total,
//       subtotal: order.subtotal,
//       tax: order.tax,
//       shipping: order.shipping,
//       discount: order.discount,
//       shippingAddress: order.shippingAddress,
//       paymentMethod: order.paymentMethod,
//       estimatedDelivery: order.estimatedDelivery,
//       status: order.status,
//       createdAt: order.createdAt?.toISOString(),
//       updatedAt: order.updatedAt?.toISOString(),
//     }));

//     return NextResponse.json(transformedOrders, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch orders" },
//       { status: 500 }
//     );
//   }
// }


//////////////// NEW 

// app/api/orders/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/Order"; // Adjust the path to your Order model
import User from "@/models/User"; // Adjust the path to your User model
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    console.log("Starting order creation...");
    await connectMongoDB();
    console.log("MongoDB connected");

    const session = await getServerSession(authOptions);
    console.log("Session:", session?.user?.email);
    
    if (!session?.user?.email) {
      console.log("No authenticated user");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User found:", user._id);

    const body = await request.json();
    console.log("Request body:", body);
    
    const { items, subtotal, tax, shipping, total, shippingAddress, paymentMethod } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Items are required" }, { status: 400 });
    }
    if (!shippingAddress) {
      return NextResponse.json({ error: "Shipping address is required" }, { status: 400 });
    }
    if (typeof total !== 'number' || total <= 0) {
      return NextResponse.json({ error: "Valid total amount is required" }, { status: 400 });
    }

    // Validate required shipping address fields
    const requiredFields = ['address', 'city', 'state', 'zipCode', 'country'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field] || shippingAddress[field].trim() === '');
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required shipping address fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }

    // Calculate total if not provided or validate it
    const calculatedTotal = (subtotal || 0) + (tax || 0) + (shipping || 0);
    const finalTotal = total || calculatedTotal;

    const orderId = uuidv4();
    const orderData = {
      id: orderId,
      user: user._id, // Associate order with user
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        // Fix: Handle both images array and image string, provide fallback
        image: item.images && Array.isArray(item.images) && item.images.length > 0 
          ? item.images[0] 
          : item.image || '/placeholder-image.jpg', // Provide fallback image
        quantity: item.quantity,
        inStock: item.inStock !== undefined ? item.inStock : true,
        category: item.category || '',
      })),
      total: finalTotal,
      subtotal: subtotal || 0,
      tax: tax || 0,
      shipping: shipping || 0,
      discount: body.discount || 0,
      shippingAddress: {
        firstName: shippingAddress.firstName || 'Not Provided',
        lastName: shippingAddress.lastName || 'Not Provided',
        email: shippingAddress.email || session.user.email,
        phone: shippingAddress.phone || 'Not Provided',
        address: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      },
      paymentMethod: paymentMethod || "credit_card",
      estimatedDelivery: body.estimatedDelivery,
      status: "pending",
    };

    console.log("Creating order with data:", orderData);

    const order = new Order(orderData);
    const savedOrder = await order.save();
    console.log("Order saved successfully:", savedOrder._id);

    // Transform the response to match frontend expectations
    const responseOrder = {
      id: savedOrder.id,
      _id: savedOrder._id,
      user: savedOrder.user,
      items: savedOrder.items,
      total: savedOrder.total,
      subtotal: savedOrder.subtotal,
      tax: savedOrder.tax,
      shipping: savedOrder.shipping,
      discount: savedOrder.discount,
      shippingAddress: savedOrder.shippingAddress,
      paymentMethod: savedOrder.paymentMethod,
      estimatedDelivery: savedOrder.estimatedDelivery,
      status: savedOrder.status,
      createdAt: savedOrder.createdAt?.toISOString(),
      updatedAt: savedOrder.updatedAt?.toISOString(),
    };

    return NextResponse.json(responseOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    
    // Provide more specific error information
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// GET - Fetch user's orders
export async function GET() {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    // Transform orders for frontend
    const transformedOrders = orders.map(order => ({
      id: order.id,
      _id: order._id,
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
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}