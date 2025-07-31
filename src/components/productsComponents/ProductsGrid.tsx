// // components/ProductsGrid.tsx
// "use client";


// import { Product } from "@/types/types";
// import { ProductCard } from "../ProductCard";

// interface ProductsGridProps {
//   products: Product[];
//   loading: boolean;
//   onProductSelect: (product: Product) => void;
// }

// export function ProductsGrid({ products, loading, onProductSelect }: ProductsGridProps) {
//   if (loading) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
//         <p className="text-gray-600">Loading products...</p>
//       </div>
//     );
//   }

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-4xl sm:text-6xl mb-4">🔍</div>
//         <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
//           No products found
//         </h3>
//         <p className="text-sm sm:text-base text-gray-500">
//           Try adjusting your search or filters
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           onViewDetails={onProductSelect}
//         />
//       ))}
//     </div>
//   );
// }