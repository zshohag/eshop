// components/SearchBar.tsx
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  productCount: number;
}

export function SearchBar({ searchQuery, onSearchChange, productCount }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-0 ">
      <div className="relative flex-1 max-w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base"
        />
      </div>
      <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
        {productCount} products
      </div>
    </div>
  );
}
