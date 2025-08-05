// components/MobileFiltersToggle.tsx
"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFiltersToggleProps {
  showMobileFilters: boolean;
  onToggle: () => void;
}

export function MobileFiltersToggle({
  showMobileFilters,
  onToggle,
}: MobileFiltersToggleProps) {
  return (
    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
      <Button
        variant="outline"
        onClick={onToggle}
        className="lg:hidden bg-transparent flex-1 sm:flex-none h-10 sm:h-12"
      >
        <Filter className="w-4 h-4 mr-2" />
        Categories
      </Button>
    </div>
  );
}
