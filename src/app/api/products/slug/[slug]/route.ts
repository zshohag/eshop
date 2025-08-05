// src/app/api/products/slug/[slug]/route.ts
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log("Received slug:", slug);

    await connectMongoDB();
    console.log("✅ Connected to MongoDB");

    // Search by slug field
    const product = await Product.findOne({ slug: slug });
    console.log("Product found:", !!product);

    if (!product) {
      console.log("Product not found for slug:", slug);
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Returning product:", product.name);
    return NextResponse.json(product);
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      {
        message: "Error fetching product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();

    console.log("PUT request received for slug:", slug);
    console.log("Request body:", JSON.stringify(body, null, 2));

    await connectMongoDB();
    console.log("✅ Connected to MongoDB");

    // Find the existing product first
    const existingProduct = await Product.findOne({ slug: slug });
    if (!existingProduct) {
      console.log("❌ Product not found for slug:", slug);
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Found existing product:", existingProduct.name);

    // Update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { slug: slug },
      body,
      {
        new: true,
        runValidators: true, // This ensures schema validation runs
      }
    );

    if (!updatedProduct) {
      console.log("❌ Update failed - product not found");
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    console.log("✅ Product updated successfully:", updatedProduct.name);
    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.error("❌ PUT Error details:", err);

    // More detailed error logging
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }

    return NextResponse.json(
      {
        message: "Error updating product",
        error: err instanceof Error ? err.message : "Unknown error",
        details: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    await connectMongoDB();

    const deletedProduct = await Product.findOneAndDelete({ slug: slug });

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      {
        message: "Error deleting product",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
