// export default function AddProductPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Add New Product</h1>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Plus, X, ArrowLeft, Package, Star, Tag } from "lucide-react";

import { useCreateProduct } from "@/lib/api/products";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
  imageUrls: z
    .array(z.string().url("Each image URL must be a valid URL").trim())
    .optional(),
  features: z.array(z.string().trim()).optional(),
  rating: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5),
      "Rating must be between 0 and 5"
    ),
  reviews: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      "Reviews must be a non-negative number"
    ),
  badge: z.string().optional(),
  inStock: z.boolean().optional(),
});

type FormValues = z.input<typeof formSchema>;

export default function AddProductPage() {
  const router = useRouter();
  const createProductMutation = useCreateProduct();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      imageUrls: [],
      features: [],
      rating: "",
      reviews: "",
      badge: "",
      inStock: true,
    },
  });

  // State to manage individual image URL input
  const [currentImageUrlInput, setCurrentImageUrlInput] = useState<string>("");
  // State to manage individual feature input
  const [currentFeatureInput, setCurrentFeatureInput] = useState<string>("");

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
      setCurrentImageUrlInput("");
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

  // Function to add a feature
  const addFeature = () => {
    if (currentFeatureInput.trim()) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue(
        "features",
        [...currentFeatures, currentFeatureInput.trim()],
        { shouldValidate: true }
      );
      setCurrentFeatureInput("");
      toast.success("Feature added successfully");
    }
  };

  // Function to remove a feature
  const removeFeature = (indexToRemove: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((_, index) => index !== indexToRemove),
      { shouldValidate: true }
    );
    toast.success("Feature removed");
  };

  // Handle Enter key press in feature input
  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  // Handle Enter key press in image URL input
  const handleImageUrlKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageUrl();
    }
  };

  // const onSubmit = async (values: FormValues) => {
  //   try {
  //     console.log("Form values before processing:", values);

  //     // Validate and parse form values
  //     const parsedValues = formSchema.parse(values);
  //     console.log("Parsed values:", parsedValues);

  //     // Generate a unique ID (you might want to let your backend handle this)
  //     //const productId = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  //     const newProduct: Omit<Product, "id"> = {
  //       name: parsedValues.name,
  //       description: parsedValues.description || "",
  //       price: Number(parsedValues.price),
  //       quantity: Number(parsedValues.quantity),
  //       category: parsedValues.category || "",
  //       images: parsedValues.imageUrls || [],
  //       features: parsedValues.features || [],
  //       rating: parsedValues.rating ? Number(parsedValues.rating) : 0,
  //       reviews: parsedValues.reviews ? Number(parsedValues.reviews) : 0,
  //       badge: parsedValues.badge || "",
  //       inStock: parsedValues.inStock ?? true,
  //     };

  //     console.log("Final product object to create:", newProduct);

  //     const result = await createProductMutation.mutateAsync(newProduct);
  //     console.log("Create result:", result);

  //     toast.success("Product created successfully!");
  //     router.push("/dashboard/admin/manage-products");
  //   } catch (err) {
  //     console.error("Form submission error:", err);

  //     if (err instanceof Error) {
  //       toast.error(`Failed to create product: ${err.message}`);
  //     } else {
  //       toast.error("Failed to create product");
  //     }
  //   }
  // };
  // Just the onSubmit function update for your React component
  const onSubmit = async (values: FormValues) => {
    try {
      console.log("Form values before processing:", values);

      // Validate and parse form values
      const parsedValues = formSchema.parse(values);
      console.log("Parsed values:", parsedValues);

      // Generate a unique ID
      const productId = `product_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const newProduct: Product = {
        id: productId, // Include the generated ID
        name: parsedValues.name,
        description: parsedValues.description || "",
        price: Number(parsedValues.price),
        quantity: Number(parsedValues.quantity),
        category: parsedValues.category || "",
        images: parsedValues.imageUrls || [],
        features: parsedValues.features || [],
        rating: parsedValues.rating ? Number(parsedValues.rating) : 0,
        reviews: parsedValues.reviews ? Number(parsedValues.reviews) : 0,
        badge: parsedValues.badge || "",
        inStock: parsedValues.inStock ?? true,
      };

      console.log("Final product object to create:", newProduct);

      const result = await createProductMutation.mutateAsync(newProduct);
      console.log("Create result:", result);

      toast.success("Product created successfully!");
      router.push("/dashboard/admin/manage-products");
    } catch (err) {
      console.error("Form submission error:", err);

      if (err instanceof Error) {
        toast.error(`Failed to create product: ${err.message}`);
      } else {
        toast.error("Failed to create product");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50/30 p-2">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/admin/manage-products")}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Manage Products
          </Button>

          <div className="flex items-center space-x-3">
            {/* <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div> */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Product
              </h1>
              <p className="text-gray-600 mt-1">
                Create a new product for your inventory
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Product Information</CardTitle>
            <CardDescription>
              Fill in the details below to add a new product to your catalog
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Product Name{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter product name"
                                className="h-11"
                              />
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
                            <FormLabel className="text-sm font-medium">
                              Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                placeholder="Describe your product..."
                                className="resize-none"
                              />
                            </FormControl>
                            <FormDescription>
                              Provide a detailed description of your product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Category
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="e.g., Electronics, Clothing, Books, Grocery"
                                className="h-11"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="badge"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Product Badge
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  {...field}
                                  placeholder="e.g., Best Seller, New Arrival, Limited Edition"
                                  className="pl-10 h-11"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Optional badge to highlight this product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Product Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Product Features
                    </h3>
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Features
                      </FormLabel>
                      <div className="flex space-x-2 mb-4">
                        <Input
                          value={currentFeatureInput}
                          onChange={(e) =>
                            setCurrentFeatureInput(e.target.value)
                          }
                          onKeyPress={handleFeatureKeyPress}
                          placeholder="e.g., 180g pack, Individually wrapped"
                          className="flex-grow h-11"
                        />
                        <Button
                          type="button"
                          onClick={addFeature}
                          variant="outline"
                          className="px-4"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                      <FormDescription>
                        Add key features and specifications of your product
                      </FormDescription>

                      {/* Features List */}
                      <div className="mt-4">
                        {(form.watch("features") || []).length > 0 ? (
                          <div className="space-y-2">
                            {(form.watch("features") || []).map(
                              (feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg group hover:bg-blue-100 transition-colors"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {index + 1}
                                    </Badge>
                                    <span className="text-sm font-medium text-gray-900">
                                      {feature}
                                    </span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFeature(index)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                            <Tag className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">
                              No features added yet
                            </p>
                            <p className="text-xs text-gray-400">
                              Add product features to highlight key benefits
                            </p>
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </div>

                  <Separator />

                  {/* Pricing and Inventory */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Pricing & Inventory
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Price <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                  $
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="pl-7 h-11"
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
                            <FormLabel className="text-sm font-medium">
                              Quantity <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="h-11"
                                placeholder="0"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Rating and Reviews */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Initial Rating
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="5"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                  className="pl-10 h-11"
                                  placeholder="0.0"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Rating out of 5 stars (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="reviews"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Number of Reviews
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="h-11"
                                placeholder="0"
                              />
                            </FormControl>
                            <FormDescription>
                              Total number of reviews (optional)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Images Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Product Images
                    </h3>
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Image URLs
                      </FormLabel>
                      <div className="flex space-x-2 mb-4">
                        <Input
                          value={currentImageUrlInput}
                          onChange={(e) =>
                            setCurrentImageUrlInput(e.target.value)
                          }
                          onKeyPress={handleImageUrlKeyPress}
                          placeholder="https://example.com/image.jpg"
                          className="flex-grow h-11"
                        />
                        <Button
                          type="button"
                          onClick={addImageUrl}
                          variant="outline"
                          className="px-4"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                      <FormMessage>
                        {form.formState.errors.imageUrls?.message}
                      </FormMessage>

                      {/* Image Preview Grid */}
                      <div className="mt-4">
                        {(form.watch("imageUrls") || []).length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(form.watch("imageUrls") || []).map(
                              (url, index) => (
                                <div
                                  key={index}
                                  className="relative group border border-gray-200 rounded-lg p-3 bg-white hover:shadow-md transition-shadow"
                                >
                                  <div className="aspect-square relative mb-3 bg-gray-50 rounded-md overflow-hidden">
                                    <Image
                                      src={url}
                                      alt={`Product image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                      onError={(e) => {
                                        e.currentTarget.src =
                                          "/placeholder-image.jpg";
                                        e.currentTarget.alt =
                                          "Image not available";
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeImageUrl(index)}
                                      className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-gray-500 truncate">
                                    {url}
                                  </p>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs mt-1"
                                  >
                                    Image {index + 1}
                                  </Badge>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">No images added yet</p>
                            <p className="text-sm text-gray-400">
                              Add image URLs to see previews here
                            </p>
                          </div>
                        )}
                      </div>
                    </FormItem>
                  </div>

                  <Separator />

                  {/* Stock Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Stock Status
                    </h3>
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
                              Check this if the product is currently available
                              for purchase
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      router.push("/dashboard/admin/manage-products")
                    }
                    className="min-w-[100px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createProductMutation.isPending}
                    className="min-w-[120px]"
                  >
                    {createProductMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Product
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
