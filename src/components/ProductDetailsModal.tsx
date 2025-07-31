// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Star, Check } from "lucide-react";
// import Image from "next/image";
// import { Product } from "@/types/types";

// interface ProductDetailsModalProps {
//   product: Product | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function ProductDetailsModal({
//   product,
//   isOpen,
//   onClose,
// }: ProductDetailsModalProps) {
//   if (!product) return null;

//   const discount = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) * 100
//       )
//     : 0;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl  max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold">
//             {product.name}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col gap-8">
//           {/* Product Image */}
//           <div className="relative">
//             <div className="relative w-full h-52 rounded-lg overflow-hidden">
//               <Image
//                 src={product.images?.[0] || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="">
//             {/* Rating */}
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-lg font-semibold">{product.rating}</span>
//               <span className="text-gray-600">({product.reviews} reviews)</span>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-3">
//               <span className="text-3xl font-bold text-gray-900">
//                 ${product.price}
//               </span>
//               {product.originalPrice && (
//                 <>
//                   <span className="text-xl text-gray-500 line-through">
//                     ${product.originalPrice}
//                   </span>
//                   <Badge variant="destructive" className="text-sm">
//                     {discount}% OFF
//                   </Badge>
//                 </>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="flex items-center gap-2">
//               {product.inStock ? (
//                 <>
//                   <Check className="w-5 h-5 text-green-500" />
//                   <span className="text-green-600 font-semibold">In Stock</span>
//                 </>
//               ) : (
//                 <span className="text-red-600 font-semibold">Out of Stock</span>
//               )}
//             </div>
//             {/* Add to Cart */}
//             {/* <Button
//               disabled={!product.inStock}
//               size="sm"
//               className="w-full text-lg py-4 mt-2"
//             >
//               <ShoppingCart className="w-5 h-5 mr-2" />
//               Add to Cart - ${product.price}
//             </Button> */}

//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

//

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Star, Check } from "lucide-react";
// import Image from "next/image";
// import { Product } from "@/types/types";

// interface ProductDetailsModalProps {
//   product: Product | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export function ProductDetailsModal({
//   product,
//   isOpen,
//   onClose,
// }: ProductDetailsModalProps) {
//   if (!product) return null;

//   const discount = product.originalPrice
//     ? Math.round(
//         ((product.originalPrice - product.price) / product.originalPrice) * 100
//       )
//     : 0;

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-5xl  max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className=" gap-2 text-2xl font-bold">
//             {product.name}
//           </DialogTitle>
//         </DialogHeader>

//         <div className="flex flex-col gap-8">
//           {/* Product Image */}
//           <div className="relative">
//             <div className="relative w-full h-72 rounded-lg overflow-hidden">
//               <Image
//                 src={product.images?.[0] || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 priority
//               />
//               {product.badge && (
//                 <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow">
//                   {product.badge}
//                 </Badge>
//               )}
//             </div>
//           </div>

//           {/* Product Details */}
//           <div className="">
//             {/* Rating */}
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${
//                       i < Math.floor(product.rating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-lg font-semibold">{product.rating}</span>
//               <span className="text-gray-600">({product.reviews} reviews)</span>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-3">
//               <span className="text-3xl font-bold text-gray-900">
//                 ${product.price}
//               </span>
//               {product.originalPrice && (
//                 <>
//                   <span className="text-xl text-gray-500 line-through">
//                     ${product.originalPrice}
//                   </span>
//                   <Badge variant="destructive" className="text-sm">
//                     {discount}% OFF
//                   </Badge>
//                 </>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="flex items-center gap-2">
//               {product.inStock ? (
//                 <>
//                   <Check className="w-5 h-5 text-green-500" />
//                   <span className="text-green-600 font-semibold">In Stock</span>
//                 </>
//               ) : (
//                 <span className="text-red-600 font-semibold">Out of Stock</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// NEW SLIDER ADD 


"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { Product } from "@/types/types";
import type { EmblaCarouselType } from "embla-carousel";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [api, setApi] = useState<EmblaCarouselType | undefined>();

  const [images, setImages] = useState<string[]>([]);


  useEffect(() => {
    if (product) {
      setImages(
        product.images && product.images.length > 0
          ? product.images
          : ["/placeholder.svg"]
      );
    }
  }, [product]);

  // Auto-play functionality
  useEffect(() => {
    if (!api || images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [api, images.length, isAutoPlaying]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Manual navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index);
      }
    },
    [api]
  );

  const goToPrevious = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const goToNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  // Pause/resume auto-play
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="">
            {/* Stock Status */}
            <div className="flex items-center gap-1">
              {product.inStock ? (
                <>
                  <span className="text-2xl font-bold ">{product.name}</span>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">In Stock</span>
                </>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          {/* Product Image Carousel */}
          <div className="relative">
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <Carousel
                className="w-full"
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-68 md:h-88 rounded-lg overflow-hidden bg-gray-50">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${product.name} - Image ${index + 1}`}
                          fill
                          className="object-contain transition-all duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0}
                        />
                        {product.badge && index === 0 && (
                          <Badge className="absolute top-4 left-4 bg-red-500 text-white shadow-lg">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation arrows - only show if more than 1 image */}
                {images.length > 1 && (
                  <>
                    <CarouselPrevious
                      className="left-4 bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
                      onClick={goToPrevious}
                    />
                    <CarouselNext
                      className="right-4 bg-white/80 hover:bg-white shadow-lg transition-all duration-200"
                      onClick={goToNext}
                    />
                  </>
                )}
              </Carousel>

              {/* Auto-play indicator */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                    title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail navigation - only show if more than 1 image */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Progress indicators */}
            {images.length > 1 && (
              <div className="flex justify-center gap-1 mt-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Rating */}
            <div className="flex items-center gap-2">
              {/* <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice} 
                    </span>
                    <Badge variant="destructive" className="text-sm">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div> */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            {/* <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    {discount}% OFF
                  </Badge>
                </>
              )}
            </div> */}

            {/* Stock Status */}
            {/* <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">In Stock</span>
                </>
              ) : (
                <span className="text-red-600 font-semibold">Out of Stock</span>
              )}
            </div> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
