import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useProduct, useProducts } from "@/lib/api/products";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

export default function RelatedProducts() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id as string);
  const { data: products = [] } = useProducts();

  if (isLoading) {
    return (
      <div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
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
    <div>
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
