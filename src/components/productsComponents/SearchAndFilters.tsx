// components/SearchAndFilters.tsx
"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { MobileFiltersToggle } from "./MobileFiltersToggle";
import { MobileCategoryGrid } from "./MobileCategoryGrid";
import { TabletCategoryPills } from "./TabletCategoryPills";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  productCount: number;
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  productCount,
}: SearchAndFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-0">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          productCount={productCount}
        />
        <MobileFiltersToggle
          showMobileFilters={showMobileFilters}
          onToggle={() => setShowMobileFilters(!showMobileFilters)}
        />
      </div>

      <MobileCategoryGrid
        showMobileFilters={showMobileFilters}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onClose={() => setShowMobileFilters(false)}
      />

      <TabletCategoryPills
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
}
