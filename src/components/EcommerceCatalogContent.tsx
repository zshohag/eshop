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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50/[.10]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex gap-6 lg:gap-8 ">
          {/* Desktop Sidebar - Hidden on mobile and tablet */}
          <div className="hidden lg:block ">
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
    <div  className="">
      <EcommerceCatalogContent />
    </div>
  );
}
