

// "use client";

// import { useState, useMemo } from "react";
// import { Search, Filter, ShoppingBag, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CategorySidebar } from "./CategorySidebar";
// import { ProductCard } from "./ProductCard";
// import { ProductDetailsModal } from "./ProductDetailsModal";
// import { categories } from "@/data/products";
// import { Product } from "@/types/types";
// import { useProducts } from "@/lib/api/products";

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

//   // ✅ Filtering products
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
//           {/* Desktop Sidebar - Hidden on mobile and tablet */}
//           <div className="hidden lg:block">
//             <CategorySidebar
//               selectedCategory={selectedCategory}
//               onCategoryChange={setSelectedCategory}
//             />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1 min-w-0">
//             {/* Search and Filters */}
//             <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
//               {/* Search Bar - Full width on mobile */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-0">
//                 <div className="relative flex-1 max-w-full sm:max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//                   <Input
//                     placeholder="Search products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
//                   <Button
//                     variant="outline"
//                     onClick={() => setShowMobileFilters(!showMobileFilters)}
//                     className="lg:hidden bg-transparent flex-1 sm:flex-none h-10 sm:h-12"
//                   >
//                     <Filter className="w-4 h-4 mr-2" />
//                     Categories
//                   </Button>

//                   <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
//                     {filteredProducts.length} products
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile/Tablet Category Grid - Collapsible */}
//               <div
//                 className={`lg:hidden transition-all duration-300 ${
//                   showMobileFilters
//                     ? "max-h-96 opacity-100"
//                     : "max-h-0 opacity-0 overflow-hidden"
//                 }`}
//               >
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="flex items-center justify-between mb-3">
//                     <h3 className="font-medium text-gray-900">Categories</h3>
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setShowMobileFilters(false)}
//                       className="p-1 h-auto"
//                     >
//                       <X className="w-4 h-4" />
//                     </Button>
//                   </div>

//                   {/* Category Grid for Mobile/Tablet */}
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
//                     <Button
//                       variant={
//                         selectedCategory === "all" ? "default" : "outline"
//                       }
//                       onClick={() => {
//                         setSelectedCategory("all");
//                         setShowMobileFilters(false);
//                       }}
//                       className="h-12 sm:h-14 flex flex-col items-center gap-1 text-xs sm:text-sm p-2"
//                     >
//                       <ShoppingBag
//                         className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                           selectedCategory === "all"
//                             ? "text-white"
//                             : "text-primary"
//                         }`}
//                       />
//                       <span>All</span>
//                     </Button>

//                     {categories.map((category) => {
//                       const Icon = category.icon;
//                       const isSelected = selectedCategory === category.id;

//                       return (
//                         <Button
//                           key={category.id}
//                           variant={isSelected ? "default" : "outline"}
//                           onClick={() => {
//                             setSelectedCategory(category.id);
//                             setShowMobileFilters(false);
//                           }}
//                           className="h-12 sm:h-14 flex flex-col items-center gap-1 text-xs sm:text-sm p-2"
//                         >
//                           <Icon
//                             className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                               isSelected ? "text-white" : "text-primary"
//                             }`}
//                           />
//                           <span className="truncate w-full">
//                             {category.name}
//                           </span>
//                         </Button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>

//               {/* Always visible category pills for medium screens */}
//               <div className="hidden md:flex lg:hidden mt-4 gap-2 flex-wrap">
//                 <Button
//                   variant={selectedCategory === "all" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => setSelectedCategory("all")}
//                   className="flex items-center gap-2"
//                 >
//                   <ShoppingBag
//                     className={`w-4 h-4 ${
//                       selectedCategory === "all" ? "text-white" : "text-primary"
//                     }`}
//                   />
//                   All
//                 </Button>

//                 {categories.map((category) => {
//                   const Icon = category.icon;
//                   const isSelected = selectedCategory === category.id;

//                   return (
//                     <Button
//                       key={category.id}
//                       variant={isSelected ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setSelectedCategory(category.id)}
//                       className="flex items-center gap-2"
//                     >
//                       <Icon
//                         className={`w-4 h-4 ${
//                           isSelected ? "text-white" : "text-primary"
//                         }`}
//                       />
//                       {category.name}
//                     </Button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Products Grid - Responsive */}
//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
//                 <p className="text-gray-600">Loading products...</p>
//               </div>
//             ) : filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-4xl sm:text-6xl mb-4">🔍</div>
//                 <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-500">
//                   Try adjusting your search or filters
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
//                 {filteredProducts.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     onViewDetails={handleOpenModal}
//                   />
//                 ))}
//               </div>
//             )}
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
//   return (
//     <>
//       <EcommerceCatalogContent />
//     </>
//   );
// }


///////////
// Main EcommerceCatalog.tsx
"use client";

import { useState, useMemo } from "react";

import { ProductDetailsModal } from "./ProductDetailsModal";
import { Product } from "@/types/types";
import { useProducts } from "@/lib/api/products";
import { CategorySidebar } from "./CategorySidebar";
import { SearchAndFilters } from "./productsComponents/SearchAndFilters";
import { ProductsGrid } from "./productsComponents/ProductsGrid";

function EcommerceCatalogContent() {
  const { data: allProducts = [], isLoading: loading } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // ✅ Filtering products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.features?.some((feature) =>
            feature.toLowerCase().includes(query)
          )
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Sidebar - Hidden on mobile and tablet */}
          <div className="hidden lg:block">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <SearchAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              productCount={filteredProducts.length}
            />

            <ProductsGrid
              products={filteredProducts}
              loading={loading}
              onProductSelect={handleOpenModal}
            />
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <div className="p-1">
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default function EcommerceCatalog() {
  return (
    <>
      <EcommerceCatalogContent />
    </>
  );
}
