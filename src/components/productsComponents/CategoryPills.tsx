
// // components/CategoryPills.tsx
// "use client";

// import { ShoppingBag } from "lucide-react";
// import { CategoryButton } from "./CategoryButton";
// import { categories } from "@/data/products";

// interface CategoryPillsProps {
//   selectedCategory: string;
//   onCategoryChange: (category: string) => void;
// }

// export function CategoryPills({ selectedCategory, onCategoryChange }: CategoryPillsProps) {
//   return (
//     <div className="hidden md:flex lg:hidden mt-4 gap-2 flex-wrap">
//       {/* All Categories Pill */}
//       <CategoryButton
//         id="all"
//         name="All"
//         icon={ShoppingBag}
//         isSelected={selectedCategory === "all"}
//         onClick={onCategoryChange}
//         variant="pill"
//       />

//       {/* Category Pills */}
//       {categories.map((category) => (
//         <CategoryButton
//           key={category.id}
//           id={category.id}
//           name={category.name}
//           icon={category.icon}
//           isSelected={selectedCategory === category.id}
//           onClick={onCategoryChange}
//           variant="pill"
//         />
//       ))}
//     </div>
//   );
// }
