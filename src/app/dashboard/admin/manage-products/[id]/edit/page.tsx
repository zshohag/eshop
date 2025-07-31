// "use client";

// import { useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";

// import { useProduct, useUpdateProduct } from "@/lib/api/products";
// import { Product } from "@/types/types";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";

// // Define the input schema
// const formSchema = z.object({
//   name: z.string().min(1, "Name is required").trim(),
//   description: z.string().optional(),
//   price: z
//     .string()
//     .min(1, "Price is required")
//     .refine(
//       (val) => !isNaN(Number(val)) && Number(val) >= 0,
//       "Price must be a non-negative number"
//     ),
//   quantity: z
//     .string()
//     .min(1, "Quantity is required")
//     .refine(
//       (val) => !isNaN(Number(val)) && Number(val) >= 0,
//       "Quantity must be a non-negative number"
//     ),
//   category: z.string().optional(),
//   imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
//   inStock: z.boolean().optional(),
// });

// type FormValues = z.input<typeof formSchema>;

// export default function EditProductPage() {
//   const router = useRouter();
//   const params = useParams();
//   const productId = params.id as string;

//   const { data: product, isLoading, error } = useProduct(productId);
//   const updateProductMutation = useUpdateProduct();

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       price: "0",
//       quantity: "0",
//       category: "",
//       imageUrl: "",
//       inStock: true,
//     },
//   });

//   useEffect(() => {
//     if (product) {
//       form.reset({
//         name: product.name || "",
//         description: product.description || "",
//         price: String(product.price || 0),
//         quantity: String(product.quantity || 0),
//         category: product.category || "",
//         imageUrl: product.images?.[0] || "",
//         inStock: product.inStock ?? true,
//       });
//     }
//   }, [product]);

//   const onSubmit = async (values: FormValues) => {
//     try {
//       if (!product) {
//         toast.error("No product data available");
//         return;
//       }

//       // Validate and parse form values
//       const parsedValues = formSchema.parse(values);

//       const updatedProduct: Product = {
//         id: productId,
//         name: parsedValues.name,
//         description: parsedValues.description || "",
//         price: Number(parsedValues.price),
//         quantity: Number(parsedValues.quantity),
//         category: parsedValues.category || "",
//         images: parsedValues.imageUrl ? [parsedValues.imageUrl] : [],
//         inStock: parsedValues.inStock ?? true,
//         features: product.features || [],
//         rating: product.rating || 0,
//         reviews: product.reviews || 0,
//       };

//       // Pass the updatedProduct directly to mutateAsync
//       await updateProductMutation.mutateAsync(updatedProduct);
//       toast.success("Product updated successfully");
//       router.push("/dashboard/admin/manage-products");
//     } catch (err) {
//       toast.error("Failed to update product");
//       console.error("Update error:", err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
//         <span className="ml-2 text-gray-600">Loading product...</span>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <p className="text-red-800">Product not found or failed to load.</p>
//           <Button
//             variant="link"
//             onClick={() => router.push("/products/manage")}
//           >
//             ← Back to Manage Products
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <Button
//         variant="link"
//         onClick={() => router.push("/products/manage")}
//         className="mb-4"
//       >
//         ← Back to Manage Products
//       </Button>

//       <h1 className="text-2xl font-bold mb-2">Edit Product</h1>
//       <p className="text-gray-600 mb-6">Update product information</p>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Product Name *</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="Product name" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     {...field}
//                     rows={4}
//                     placeholder="Product description"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price *</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       step="0.01"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.value)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quantity *</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.value)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category</FormLabel>
//                 <FormControl>
//                   <Input {...field} placeholder="e.g., Electronics" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image URL</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </FormControl>
//                 <FormMessage />
//                 {field.value && (
//                   <div className="mt-2">
//                     <img
//                       src={field.value}
//                       alt="Preview"
//                       className="h-20 w-20 object-cover border rounded-md"
//                       onError={(e) => (e.currentTarget.style.display = "none")}
//                     />
//                   </div>
//                 )}
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="inStock"
//             render={({ field }) => (
//               <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//                 <FormLabel className="font-normal">
//                   Product is in stock
//                 </FormLabel>
//               </FormItem>
//             )}
//           />

//           <div className="flex justify-end gap-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => router.push("/products/manage")}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={updateProductMutation.isPending}>
//               {updateProductMutation.isPending
//                 ? "Updating..."
//                 : "Update Product"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

////

"use client";

import { useEffect, useState } from "react"; 
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Image from "next/image"; // Import next/image

import { useProduct, useUpdateProduct } from "@/lib/api/products";
import { Product } from "@/types/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Define the input schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
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
        description: product.description || "",
        price: String(product.price || 0),
        quantity: String(product.quantity || 0),
        category: product.category || "",
        imageUrls: product.images || [], // Set product images to imageUrls
        inStock: product.inStock ?? true,
      });
    }
  }, [product, form]); // Added 'form' to the dependency array

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
        description: parsedValues.description || "",
        price: Number(parsedValues.price),
        quantity: Number(parsedValues.quantity),
        category: parsedValues.category || "",
        images: parsedValues.imageUrls || [], // Use the array of image URLs
        inStock: parsedValues.inStock ?? true,
        features: product.features || [],
        rating: product.rating || 0,
        reviews: product.reviews || 0,
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
            onClick={() => router.push("/dashboard/admin/manage-products")} // Corrected path
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

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Product name" />
                </FormControl>
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
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
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
                placeholder="Add image URL"
                className="flex-grow"
              />
              <Button type="button" onClick={addImageUrl}>
                Add Image
              </Button>
            </div>
            <FormMessage>
              {form.formState.errors.imageUrls?.message}
            </FormMessage>{" "}
            {/* Display validation messages for the array */}
            <div className="mt-4 space-y-2">
              {(form.watch("imageUrls") || []).map((url, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-md p-2"
                >
                  <div className="flex-shrink-0">
                    {/* Using next/image for optimized images */}
                    <Image
                      src={url}
                      alt={`Product image ${index + 1}`}
                      width={80}
                      height={80}
                      objectFit="cover"
                      className="rounded-md"
                      // Optional: onError handler for broken images
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg"; // Fallback image
                        e.currentTarget.alt = "Image not available";
                      }}
                    />
                  </div>
                  <span className="truncate flex-grow text-sm">{url}</span>
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
                  <p className="text-sm text-gray-500">No images added yet.</p>
                )}
            </div>
          </FormItem>

          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  Product is in stock
                </FormLabel>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/admin/manage-products")} // Corrected path
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateProductMutation.isPending}>
              {updateProductMutation.isPending
                ? "Updating..."
                : "Update Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
