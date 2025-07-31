// Updated ProductDetailsPage with Redux integration

// "use client";

// import { useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   ShoppingCart,
//   Star,
//   Check,
//   Truck,
//   RotateCcw,
//   Shield,
// } from "lucide-react";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
// import { useProduct, useProducts } from "@/lib/api/products";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
// import { addToCart } from "@/lib/store/slices/cartSlice";
// import { toast } from "sonner";

// export default function ProductDetailsPage() {
//   const { id } = useParams();
//   const { data: product, isLoading, isError } = useProduct(id as string);
//   const { data: products = [] } = useProducts();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState<string | undefined>(
//     undefined
//   );

//   const dispatch = useAppDispatch();
//   const { itemCount } = useAppSelector((state) => state.cart);

//   // Set default image when product loads
//   useEffect(() => {
//     if (product && product.images && product.images.length > 0) {
//       setSelectedImage(product.images[0]);
//     }
//   }, [product]);

//   const handleAddToCart = () => {
//     if (!product) return;

//     for (let i = 0; i < quantity; i++) {
//       dispatch(
//         addToCart({
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           originalPrice: product.originalPrice,
//           images:
//             product.images && product.images.length > 0
//               ? [product.images[0]]
//               : ["/placeholder.svg"],
//           inStock: product.inStock,
//           category: product.category,
//           quantity: product.quantity,
//         })
//       );
//     }

//     toast.success(`${quantity} ${product.name}(s) added to cart!`);
//     setQuantity(1);
//   };

//   if (isLoading) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">Loading...</div>
//     );
//   }

//   if (isError || !product) {
//     return (
//       <div className="text-center py-20 text-xl text-gray-600">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="grid md:grid-cols-2 gap-8">
//         {/* Image Section */}
//         <div className="space-y-4">
//           <div className="max-w-4xl mx-auto w-full">
//             <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow group">
//               <Image
//                 src={selectedImage || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           <div className="flex gap-3 overflow-x-auto">
//             {product.images?.map((img, index) => (
//               <div
//                 key={index}
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-20 h-20 rounded-lg overflow-hidden border cursor-pointer ${
//                   selectedImage === img ? "border-gray-500" : "border-gray-200"
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`Preview ${index}`}
//                   width={80}
//                   height={80}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-3 flex-wrap">
//             <h1 className="text-3xl font-bold">{product.name}</h1>

//             {product.inStock ? (
//               <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
//                 <Check className="w-4 h-4" />
//                 In Stock
//               </Badge>
//             ) : (
//               <Badge
//                 variant="destructive"
//                 className="px-3 py-1 text-sm font-medium"
//               >
//                 Out of Stock
//               </Badge>
//             )}
//           </div>

//           <div className="flex items-center gap-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-5 h-5 ${
//                   i < Math.floor(product.rating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-gray-600">({product.reviews} reviews)</span>
//           </div>

//           <div className="flex items-center gap-3 text-2xl font-bold">
//             <span>${product.price}</span>
//             {product.originalPrice && (
//               <>
//                 <span className="text-lg line-through text-gray-500">
//                   ${product.originalPrice}
//                 </span>
//                 <Badge variant="destructive">
//                   {Math.round(
//                     ((product.originalPrice - product.price) /
//                       product.originalPrice) *
//                       100
//                   )}
//                   % OFF
//                 </Badge>
//               </>
//             )}
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">{product.description}</p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Key Features</h3>
//             <ul className="list-disc list-inside text-gray-700 space-y-1">
//               {product.features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center flex-wrap gap-4 mt-6">
//             {/* Quantity Selector */}
//             <div className="flex items-center px-3 py-2 gap-4 border rounded-lg">
//               <span className="text-sm font-medium">Quantity:</span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               >
//                 -
//               </Button>
//               <span className="text-lg font-medium w-6 text-center">
//                 {quantity}
//               </span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 +
//               </Button>
//             </div>

//             {/* Add to Cart Button */}
//             <div className="flex-1">
//               <Button
//                 disabled={!product.inStock}
//                 onClick={handleAddToCart}
//                 className="w-full text-lg px-6 py-5 bg-blue-600 hover:bg-blue-700"
//               >
//                 <ShoppingCart className="mr-2 w-5 h-5" />
//                 Add to Cart – ${(product.price * quantity).toFixed(2)}
//               </Button>
//             </div>
//           </div>

//           {/* Cart Badge */}
//           {itemCount > 0 && (
//             <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
//               <ShoppingCart className="w-5 h-5 text-green-600" />
//               <span className="text-green-700 font-medium">
//                 {itemCount} item(s) in cart
//               </span>
//               <Link href="/cart">
//                 <Button variant="outline" size="sm" className="ml-auto">
//                   View Cart
//                 </Button>
//               </Link>
//             </div>
//           )}

//           <div className="grid grid-cols-3 gap-4 pt-4 border-t">
//             <div className="text-center">
//               <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
//               <div className="font-semibold text-sm">Free Shipping</div>
//               <div className="text-xs text-gray-500">On orders over $50</div>
//             </div>
//             <div className="text-center">
//               <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
//               <div className="font-semibold text-sm">30-Day Returns</div>
//               <div className="text-xs text-gray-500">No questions asked</div>
//             </div>
//             <div className="text-center">
//               <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
//               <div className="font-semibold text-sm">2-Year Warranty</div>
//               <div className="text-xs text-gray-500">Full protection</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="max-w-7xl mx-auto px-4 mt-20">
//         <h1 className="text-3xl font-bold my-6">Related Products</h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {products
//             .filter(
//               (p) => p.category === product.category && p.id !== product.id
//             )
//             .slice(0, 6)
//             .map((related) => (
//               <Card
//                 key={related.id}
//                 className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
//               >
//                 <div className="relative">
//                   <div className="relative h-56 overflow-hidden">
//                     <Image
//                       src={related.images?.[0] || "/placeholder.svg"}
//                       alt={related.name}
//                       fill
//                       className="object-cover group-hover:scale-105 transition-transform duration-300"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                     {related.badge && (
//                       <Badge className="absolute top-3 left-3 bg-red-500">
//                         {related.badge}
//                       </Badge>
//                     )}
//                     {!related.inStock && (
//                       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                         <Badge
//                           variant="destructive"
//                           className="text-lg px-4 py-2"
//                         >
//                           Out of Stock
//                         </Badge>
//                       </div>
//                     )}
//                   </div>

//                   <CardContent className="p-4">
//                     <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
//                       {related.name}
//                     </h3>

//                     <div className="flex items-center gap-1 mb-2">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < Math.floor(related.rating)
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "text-gray-300"
//                           }`}
//                         />
//                       ))}
//                       <span className="text-sm text-gray-600 ml-1">
//                         ({related.reviews})
//                       </span>
//                     </div>

//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                       {related.description}
//                     </p>

//                     <div className="flex flex-wrap gap-1 mb-3">
//                       {related.features.slice(0, 3).map((feature, index) => (
//                         <Badge
//                           key={index}
//                           variant="outline"
//                           className="text-xs"
//                         >
//                           {feature}
//                         </Badge>
//                       ))}
//                       {related.features.length > 3 && (
//                         <Badge variant="outline" className="text-xs">
//                           +{related.features.length - 3} more
//                         </Badge>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ${related.price}
//                       </span>
//                       {related.originalPrice && (
//                         <span className="text-lg text-gray-500 line-through">
//                           ${related.originalPrice}
//                         </span>
//                       )}
//                     </div>
//                   </CardContent>
//                 </div>

//                 <div className="px-2 pb-4 flex flex-col mt-auto">
//                   <Link href={`/products/${related.id}`} className="w-full">
//                     <Button variant="default" className="w-full">
//                       View More
//                     </Button>
//                   </Link>
//                 </div>
//               </Card>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

///

"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Star,
  Check,
  Truck,
  RotateCcw,
  Shield,
  Play,
  Pause,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useProduct, useProducts } from "@/lib/api/products";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { toast } from "sonner";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id as string);
  const { data: products = [] } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const dispatch = useAppDispatch();
  const { itemCount } = useAppSelector((state) => state.cart);

  // Set default image when product loads
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Auto-slide functionality
  useEffect(() => {
    if (!product?.images || product.images.length <= 1 || !isAutoPlaying)
      return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % product.images.length;
        setSelectedImage(product.images[nextIndex]);
        return nextIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [product?.images, isAutoPlaying]);

  // Manual image selection
  const handleImageSelect = useCallback((img: string, index: number) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
  }, []);

  // Toggle auto-play
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  // Resume auto-play on mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          images:
            product.images && product.images.length > 0
              ? [product.images[0]]
              : ["/placeholder.svg"],
          inStock: product.inStock,
          category: product.category,
          quantity: product.quantity,
        })
      );
    }
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
    setQuantity(1);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section - AliExpress Style with Auto-Slide */}
        <div className="space-y-4">
          {/* Large Device Layout - AliExpress Style */}
          <div className="hidden md:flex gap-4">
            {/* Vertical Thumbnail Column */}
            {product.images && product.images.length > 0 && (
              // <div className="flex flex-col gap-2 w-16">

              <div className="flex flex-col gap-2 w-16 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent justify-center">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageSelect(img, index)}
                    className={`relative w-14 h-14 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      currentImageIndex === index
                        ? "border-gray-500 shadow-lg "
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                    {/* Active indicator */}
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 border border-gray rounded-md" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Large Main Image with Auto-Slide */}
            <div className="flex-1 relative">
              <div
                className="relative w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 bg-white"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                  priority
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow-md">
                    {product.badge}
                  </Badge>
                )}

                {/* Auto-play controls */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={toggleAutoPlay}
                      className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200"
                      title={
                        isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                      }
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

                {/* Image Navigation Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images?.length || 1}
                </div>

                {/* Progress bar */}
                {product.images &&
                  product.images.length > 1 &&
                  isAutoPlaying && (
                    <div className="absolute bottom-4 left-4 right-20">
                      <div className="w-full bg-white/30 rounded-full h-1">
                        <div
                          className="bg-black  h-1 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              ((currentImageIndex + 1) /
                                product.images.length) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Stack Vertically with Auto-Slide */}
          <div className="md:hidden space-y-4">
            {/* Main Image */}
            <div
              className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 bg-white"
              onTouchStart={handleMouseEnter}
              onTouchEnd={handleMouseLeave}
            >
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow-md">
                  {product.badge}
                </Badge>
              )}

              {/* Auto-play controls for mobile */}
              {product.images && product.images.length > 1 && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={toggleAutoPlay}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200"
                    title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <Play className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}

              {/* Image counter for mobile */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                {currentImageIndex + 1} / {product.images?.length || 1}
              </div>

              {/* Progress bar for mobile */}
              {product.images && product.images.length > 1 && isAutoPlaying && (
                <div className="absolute bottom-4 left-4 right-16">
                  <div className="w-full bg-white/30 rounded-full h-1">
                    <div
                      className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((currentImageIndex + 1) / product.images.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal Thumbnails for Mobile */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageSelect(img, index)}
                    className={`flex-shrink-0 relative w-16 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-orange-500 shadow-lg"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                    {/* Active indicator for mobile */}
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 bg-orange-500/10 border border-orange-500 rounded-md" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.inStock ? (
              <Badge className="bg-green-100 text-green-700 border border-green-400 px-3 py-1 text-sm font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                In Stock
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="px-3 py-1 text-sm font-medium"
              >
                Out of Stock
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-3 text-2xl font-bold">
            <span>${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg line-through text-gray-500">
                  ${product.originalPrice}
                </span>
                <Badge variant="destructive">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </Badge>
              </>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center flex-wrap gap-4 mt-6">
            {/* Quantity Selector */}
            <div className="flex items-center px-3 py-2 gap-4 border rounded-lg">
              <span className="text-sm font-medium">Quantity:</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="text-lg font-medium w-6 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </Button>
            </div>
            {/* Add to Cart Button */}
            <div className="flex-1">
              <Button
                disabled={!product.inStock || product.badge === "Coming Soon"}
                onClick={handleAddToCart}
                className="w-full text-lg px-6 py-5 bg-black text-white"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Add to Cart – ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
          {/* Cart Badge */}
          {itemCount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">
                {itemCount} item(s) in cart
              </span>
              <Link href="/cart">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto bg-transparent"
                >
                  View Cart
                </Button>
              </Link>
            </div>
          )}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <div className="font-semibold text-sm">Free Shipping</div>
              <div className="text-xs text-gray-500">On orders over $50</div>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <div className="font-semibold text-sm">30-Day Returns</div>
              <div className="text-xs text-gray-500">No questions asked</div>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
              <div className="font-semibold text-sm">2-Year Warranty</div>
              <div className="text-xs text-gray-500">Full protection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <h1 className="text-3xl font-bold my-6">Related Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products
            .filter(
              (p) => p.category === product.category && p.id !== product.id
            )
            .slice(0, 6)
            .map((related) => (
              <Card
                key={related.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden h-full flex flex-col justify-between"
              >
                <div className="relative">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={related.images?.[0] || "/placeholder.svg"}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {related.badge && (
                      <Badge className="absolute top-3 left-3 bg-red-500">
                        {related.badge}
                      </Badge>
                    )}
                    {!related.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge
                          variant="destructive"
                          className="text-lg px-4 py-2"
                        >
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {related.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(related.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">
                        ({related.reviews})
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {related.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {related.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{related.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${related.price}
                      </span>
                      {related.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${related.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>
                <div className="px-2 pb-4 flex flex-col mt-auto">
                  <Link href={`/products/${related.id}`} className="w-full">
                    <Button variant="default" className="w-full">
                      View More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
