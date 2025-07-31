import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { products } from "@/data/products";

export async function GET() {
  try {
    await connectMongoDB();
    await Product.deleteMany(); // clear old
    await Product.insertMany(products);
    return NextResponse.json({ message: "✅ Products seeded!" });
  } catch (error) {
    console.error("❌ Seeding error:", error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}


//http://localhost:3000/api/products/seed