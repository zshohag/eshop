// // components/CategoryButton.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { LucideIcon } from "lucide-react";

// interface CategoryButtonProps {
//   id: string;
//   name: string;
//   icon: LucideIcon;
//   isSelected: boolean;
//   onClick: (categoryId: string) => void;
//   variant?: "grid" | "pill";
//   onClose?: () => void;
// }

// export function CategoryButton({ 
//   id, 
//   name, 
//   icon: Icon, 
//   isSelected, 
//   onClick,
//   variant = "grid",
//   onClose 
// }: CategoryButtonProps) {
//   const handleClick = () => {
//     onClick(id);
//     onClose?.();
//   };

//   if (variant === "grid") {
//     return (
//       <Button
//         variant={isSelected ? "default" : "outline"}
//         onClick={handleClick}
//         className="h-12 sm:h-14 flex flex-col items-center gap-1 text-xs sm:text-sm p-2"
//       >
//         <Icon
//           className={`w-4 h-4 sm:w-5 sm:h-5 ${
//             isSelected ? "text-white" : "text-primary"
//           }`}
//         />
//         <span className="truncate w-full">{name}</span>
//       </Button>
//     );
//   }

//   return (
//     <Button
//       variant={isSelected ? "default" : "outline"}
//       size="sm"
//       onClick={handleClick}
//       className="flex items-center gap-2"
//     >
//       <Icon
//         className={`w-4 h-4 ${
//           isSelected ? "text-white" : "text-primary"
//         }`}
//       />
//       {name}
//     </Button>
//   );
// }
