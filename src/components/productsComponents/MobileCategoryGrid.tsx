// // components/MobileCategoryGrid.tsx
// "use client";

// import { X, ShoppingBag } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { CategoryButton } from "./CategoryButton";
// import { categories } from "@/data/products";

// interface MobileCategoryGridProps {
//   showMobileFilters: boolean;
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
//   onClose: () => void;
// }

// export function MobileCategoryGrid({
//   showMobileFilters,
//   selectedCategory,
//   onCategoryChange,
//   onClose
// }: MobileCategoryGridProps) {
//   return (
//     <div
//       className={`lg:hidden transition-all duration-300 ${
//         showMobileFilters
//           ? "max-h-96 opacity-100"
//           : "max-h-0 opacity-0 overflow-hidden"
//       }`}
//     >
//       <div className="pt-4 border-t border-gray-200">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="font-medium text-gray-900">Categories</h3>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={onClose}
//             className="p-1 h-auto"
//           >
//             <X className="w-4 h-4" />
//           </Button>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
//           {/* All Categories Button */}
//           <Button
//             variant={selectedCategory === "all" ? "default" : "outline"}
//             onClick={() => {
//               onCategoryChange("all");
//               onClose();
//             }}
//             className="h-12 sm:h-14 flex flex-col items-center gap-1 text-xs sm:text-sm p-2"
//           >
//             <ShoppingBag
//               className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                 selectedCategory === "all" ? "text-white" : "text-primary"
//               }`}
//             />
//             <span>All</span>
//           </Button>

//           {/* Category Buttons */}
//           {categories.map((category) => (
//             <CategoryButton
//               key={category.id}
//               id={category.id}
//               name={category.name}
//               icon={category.icon}
//               isSelected={selectedCategory === category.id}
//               onClick={onCategoryChange}
//               variant="grid"
//               onClose={onClose}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }