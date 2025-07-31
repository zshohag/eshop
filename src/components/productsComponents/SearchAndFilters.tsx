// // components/SearchAndFilters.tsx
// "use client";

// import { SearchBar } from "./SearchBar";
// import { MobileFiltersButton } from "./MobileFiltersButton";
// import { MobileCategoryGrid } from "./MobileCategoryGrid";
// import { CategoryPills } from "./CategoryPills";

// interface SearchAndFiltersProps {
//   searchQuery: string;
//   onSearchChange: (query: string) => void;
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   showMobileFilters: boolean;
//   onToggleMobileFilters: () => void;
//   productCount: number;
// }

// export function SearchAndFilters({
//   searchQuery,
//   onSearchChange,
//   selectedCategory,
//   onCategoryChange,
//   showMobileFilters,
//   onToggleMobileFilters,
//   productCount
// }: SearchAndFiltersProps) {
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
//       {/* Search Bar and Mobile Filters Button */}
//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between mb-4 sm:mb-0">
//         <SearchBar 
//           searchQuery={searchQuery} 
//           onSearchChange={onSearchChange} 
//         />
        
//         <MobileFiltersButton
//           showMobileFilters={showMobileFilters}
//           onToggle={onToggleMobileFilters}
//           productCount={productCount}
//         />
//       </div>

//       {/* Mobile Category Grid */}
//       <MobileCategoryGrid
//         showMobileFilters={showMobileFilters}
//         selectedCategory={selectedCategory}
//         onCategoryChange={onCategoryChange}
//         onClose={() => onToggleMobileFilters()}
//       />

//       {/* Category Pills for Medium Screens */}
//       <CategoryPills
//         selectedCategory={selectedCategory}
//         onCategoryChange={onCategoryChange}
//       />
//     </div>
//   );
// }