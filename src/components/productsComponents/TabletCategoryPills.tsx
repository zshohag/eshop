// components/TabletCategoryPills.tsx
"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/products";

interface TabletCategoryPillsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function TabletCategoryPills({
  selectedCategory,
  onCategoryChange,
}: TabletCategoryPillsProps) {
  return (
    <div className="hidden md:flex lg:hidden mt-4 gap-2 flex-wrap">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        className="flex items-center gap-2"
      >
        <ShoppingBag
          className={`w-4 h-4 ${
            selectedCategory === "all" ? "text-white" : "text-primary"
          }`}
        />
        All
      </Button>

      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2"
          >
            <Icon
              className={`w-4 h-4 ${
                isSelected ? "text-white" : "text-primary"
              }`}
            />
            {category.name}
          </Button>
        );
      })}
    </div>
  );
}
