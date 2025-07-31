
// // Main component - EcommerceCatalog.tsx
// "use client";

// import { useState, useMemo } from "react";
// import { CategorySidebar } from "./CategorySidebar";

// import { ProductDetailsModal } from "./ProductDetailsModal";
// import { Product } from "@/types/types";
// import { useProducts } from "@/lib/api/products";
// import { SearchAndFilters } from "./products/SearchAndFilters";
// import { ProductsGrid } from "./products/ProductsGrid";

// function EcommerceCatalogContent() {
//   const { data: allProducts = [], isLoading: loading } = useProducts();

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleOpenModal = (product: Product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleToggleMobileFilters = () => {
//     setShowMobileFilters(!showMobileFilters);
//   };

//   // Filtering products
//   const filteredProducts = useMemo(() => {
//     let filtered = allProducts;

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(query) ||
//           product.description?.toLowerCase().includes(query) ||
//           product.features?.some((feature) =>
//             feature.toLowerCase().includes(query)
//           )
//       );
//     }

//     return filtered;
//   }, [allProducts, selectedCategory, searchQuery]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
//         <div className="flex gap-6 lg:gap-8">
//           {/* Desktop Sidebar - Fixed/Sticky */}
//           <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
//             <div className="sticky top-4">
//               <CategorySidebar
//                 selectedCategory={selectedCategory}
//                 onCategoryChange={setSelectedCategory}
//               />
//             </div>
//           </div>

//           {/* Main Content - Scrollable */}
//           <div className="flex-1 min-w-0">
//             {/* Search and Filters */}
//             <SearchAndFilters
//               searchQuery={searchQuery}
//               onSearchChange={setSearchQuery}
//               selectedCategory={selectedCategory}
//               onCategoryChange={setSelectedCategory}
//               showMobileFilters={showMobileFilters}
//               onToggleMobileFilters={handleToggleMobileFilters}
//               productCount={filteredProducts.length}
//             />

//             {/* Products Grid */}
//             <ProductsGrid
//               products={filteredProducts}
//               loading={loading}
//               onProductSelect={handleOpenModal}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Product Details Modal */}
//       <div className="p-1">
//         <ProductDetailsModal
//           product={selectedProduct}
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//         />
//       </div>
//     </div>
//   );
// }

// export default function EcommerceCatalog() {
//   return <EcommerceCatalogContent />;
// }
