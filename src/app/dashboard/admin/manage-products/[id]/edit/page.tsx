"use client";

import { useEffect, useState } from "react"; 
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Hash } from "lucide-react";

import { useProduct, useUpdateProduct } from "@/lib/api/products";
import { Product } from "@/types/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Helper function to generate slug from product name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Define the input schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  slug: z.string().min(1, "Slug is required").trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Price must be a non-negative number"
    ),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Quantity must be a non-negative number"
    ),
  category: z.string().optional(),
  // Modified to expect an array of strings for image URLs
  imageUrls: z
    .array(z.string().url("Each image URL must be a valid URL").trim())
    .optional(),
  inStock: z.boolean().optional(),
});

type FormValues = z.input<typeof formSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { data: product, isLoading, error } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: "0",
      quantity: "0",
      category: "",
      imageUrls: [], // Initialize as an empty array
      inStock: true,
    },
  });

  // State to manage individual image URL input
  const [currentImageUrlInput, setCurrentImageUrlInput] = useState<string>("");

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: String(product.price || 0),
        quantity: String(product.quantity || 0),
        category: product.category || "",
        imageUrls: product.images || [], // Set product images to imageUrls
        inStock: product.inStock ?? true,
      });
    }
  }, [product, form]);

  // Auto-generate slug when name changes (but allow manual editing)
  const handleNameChange = (value: string) => {
    form.setValue("name", value);
    // Only auto-generate if slug is empty or matches the previous auto-generated slug
    const currentSlug = form.getValues("slug");
    if (!currentSlug || currentSlug === generateSlug(form.getValues("name"))) {
      if (value.trim()) {
        const generatedSlug = generateSlug(value);
        form.setValue("slug", generatedSlug, { shouldValidate: true });
      } else {
        form.setValue("slug", "");
      }
    }
  };

  // Function to add an image URL
  const addImageUrl = () => {
    if (
      currentImageUrlInput &&
      z.string().url().safeParse(currentImageUrlInput).success
    ) {
      const currentImages = form.getValues("imageUrls") || [];
      form.setValue(
        "imageUrls",
        [...currentImages, currentImageUrlInput.trim()],
        { shouldValidate: true }
      );
      setCurrentImageUrlInput(""); // Clear the input after adding
      toast.success("Image URL added successfully");
    } else if (currentImageUrlInput) {
      toast.error("Please enter a valid URL.");
    }
  };

  // Function to remove an image URL
  const removeImageUrl = (indexToRemove: number) => {
    const currentImages = form.getValues("imageUrls") || [];
    form.setValue(
      "imageUrls",
      currentImages.filter((_, index) => index !== indexToRemove),
      { shouldValidate: true }
    );
    toast.success("Image URL removed");
  };

  // Handle Enter key press in image URL input
  const handleImageUrlKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageUrl();
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (!product) {
        toast.error("No product data available");
        return;
      }

      // Validate and parse form values
      const parsedValues = formSchema.parse(values);

      const updatedProduct: Product = {
        id: productId,
        name: parsedValues.name,
        slug: parsedValues.slug, // ✅ Include the slug
        description: parsedValues.description || "",
        price: Number(parsedValues.price),
        quantity: Number(parsedValues.quantity),
        category: parsedValues.category || "",
        images: parsedValues.imageUrls || [], // Use the array of image URLs
        inStock: parsedValues.inStock ?? true,
        features: product.features || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        badge: product.badge || "",
      };

      await updateProductMutation.mutateAsync(updatedProduct);
      toast.success("Product updated successfully");
      router.push("/dashboard/admin/manage-products");
    } catch (err) {
      toast.error("Failed to update product");
      console.error("Update error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Product not found or failed to load.</p>
          <Button
            variant="link"
            onClick={() => router.push("/dashboard/admin/manage-products")}
          >
            ← Back to Manage Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 max-w-4xl">
      <Button
        variant="link"
        onClick={() => router.push("/dashboard/admin/manage-products")} 
        className="mb-4"
      >
        ← Back to Manage Products
      </Button>

      <h1 className="text-2xl font-bold mb-2">Edit Product</h1>
      <p className="text-gray-600 mb-6">Update product information</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Product name" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Slug *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      {...field}
                      placeholder="product-slug-url"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  URL-friendly version of the product name. Used in product URLs.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    placeholder="Product description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="pl-7"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Electronics" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New section for multiple image URLs */}
          <FormItem>
            <FormLabel>Image URLs</FormLabel>
            <div className="flex space-x-2">
              <Input
                value={currentImageUrlInput}
                onChange={(e) => setCurrentImageUrlInput(e.target.value)}
                onKeyPress={handleImageUrlKeyPress}
                placeholder="https://example.com/image.jpg"
                className="flex-grow"
              />
              <Button type="button" onClick={addImageUrl}>
                Add Image
              </Button>
            </div>
            <FormMessage>
              {form.formState.errors.imageUrls?.message}
            </FormMessage>
            <div className="mt-4 space-y-2">
              {(form.watch("imageUrls") || []).map((url, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-md p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    {/* Using next/image for optimized images */}
                    <Image
                      src={url}
                      alt={`Product image ${index + 1}`}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover' }}
                      className="rounded-md"
                      // Optional: onError handler for broken images
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                        e.currentTarget.alt = "Image not available";
                      }}
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-xs text-gray-500 truncate">{url}</p>
                    <p className="text-sm font-medium">Image {index + 1}</p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeImageUrl(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              {form.watch("imageUrls")?.length === 0 &&
                !currentImageUrlInput && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-sm text-gray-500">No images added yet</p>
                    <p className="text-xs text-gray-400">Add image URLs to see previews here</p>
                  </div>
                )}
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-gray-50/50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">
                    Product is in stock
                  </FormLabel>
                  <FormDescription>
                    Check this if the product is currently available for purchase
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/admin/manage-products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateProductMutation.isPending}>
              {updateProductMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}