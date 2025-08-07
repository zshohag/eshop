// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/lib/store";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { User, LogOut, LayoutDashboard, Menu, Moon, Sun } from "lucide-react";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";

// export function Navbar() {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const user = session?.user;
//   const itemCount = useSelector((state: RootState) => state.cart.itemCount);
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const { setTheme, theme } = useTheme();

//   // Handle responsive behavior - close mobile menu when screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         // md breakpoint
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const navigationLinks = [
//     { href: "/products", label: "Products" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];

//   return (
//     <header className="bg-white dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] shadow-sm border-b border-gray-200  sticky top-0 z-50 transition-colors">
//       {/* <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors"> */}
//       <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo Section */}
//           <div className="flex items-center gap-3">
//             <Link href="/" className="flex items-center">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0">
//                 <Image
//                   src="/placeholder.svg?height=56&width=56"
//                   alt="Logo"
//                   fill
//                   className="object-contain rounded"
//                   sizes="(max-width: 640px) 48px, 56px"
//                   priority
//                 />
//               </div>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
//                 <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
//                   eshop
//                 </h1>
//                 <Badge
//                   variant="secondary"
//                   className="hidden sm:inline-flex text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
//                 >
//                   Store
//                 </Badge>
//               </div>
//             </Link>
//           </div>

//           {/* Desktop Navigation - Show on medium and large screens */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navigationLinks.map((link) => {
//               const isActive = pathname === link.href;
//               return (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={cn(
//                     "relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium group py-2",
//                     {
//                       "text-gray-900 dark:text-white": isActive,
//                     }
//                   )}
//                 >
//                   {link.label}
//                   <span
//                     className={cn(
//                       "absolute inset-x-0 -bottom-1 h-[2px] bg-gray-900 dark:bg-white scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
//                       {
//                         "scale-x-100": isActive,
//                       }
//                     )}
//                   />
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-2 sm:gap-4">
//             {/* Cart Icon */}
//             <Link href="/cart" className="relative group p-2">
//               <AiOutlineShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow min-w-[20px] h-5 flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </Link>

//             {/* Theme Toggle */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                 >
//                   <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//                   <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                   <span className="sr-only">Toggle theme</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 align="end"
//                 className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//               >
//                 <DropdownMenuItem
//                   onClick={() => setTheme("light")}
//                   className="dark:text-gray-200 dark:hover:bg-gray-700"
//                 >
//                   Light
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => setTheme("dark")}
//                   className="dark:text-gray-200 dark:hover:bg-gray-700"
//                 >
//                   Dark
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => setTheme("system")}
//                   className="dark:text-gray-200 dark:hover:bg-gray-700"
//                 >
//                   System
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* User Authentication */}
//             {isAuthenticated && user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-10 w-10 rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   >
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//                   align="end"
//                 >
//                   <div className="flex items-center justify-start gap-2 p-2">
//                     <div className="flex flex-col space-y-1 leading-none">
//                       <p className="font-medium text-gray-900 dark:text-white">
//                         {user.name}
//                       </p>
//                       <p className="w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>
//                   <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
//                   {user.role === "admin" && (
//                     <DropdownMenuItem
//                       asChild
//                       className="dark:text-gray-200 dark:hover:bg-gray-700"
//                     >
//                       <Link
//                         href="/dashboard/admin"
//                         className="flex items-center"
//                       >
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Admin Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                   )}
//                   <DropdownMenuItem
//                     className="cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
//                     onClick={() => signOut({ callbackUrl: "/" })}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Sign out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   asChild
//                   className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                 >
//                   <Link href="/login">Login</Link>
//                 </Button>
//                 <Button
//                   size="sm"
//                   asChild
//                   className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
//                 >
//                   <Link href="/register">Sign Up</Link>
//                 </Button>
//               </div>
//             )}

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                 >
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="right"
//                 className="w-[250px] sm:w-[320px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
//               >
//                 <SheetHeader>
//                   <SheetTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
//                     <div className="w-10 h-10 relative">
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt="Logo"
//                         fill
//                         className="object-contain rounded"
//                         sizes="40px"
//                       />
//                     </div>
//                     eshop
//                   </SheetTitle>
//                 </SheetHeader>

//                 <div className="flex flex-col  mt-1">
//                   {/* Navigation Links */}
//                   <nav className="flex flex-col gap-2">
//                     {navigationLinks.map((link) => {
//                       const isActive = pathname === link.href;
//                       return (
//                         <Link
//                           key={link.href}
//                           href={link.href}
//                           onClick={() => setIsOpen(false)}
//                           className={cn(
//                             "relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 font-medium py-3 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group",
//                             {
//                               "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800":
//                                 isActive,
//                             }
//                           )}
//                         >
//                           {link.label}
//                           {/* Mobile hover and active underline */}
//                           <span
//                             className={cn(
//                               "absolute left-3 right-3 bottom-1 h-[2px] bg-gray-900 dark:bg-white origin-left transition-all duration-300 ease-out",
//                               "scale-x-0 group-hover:scale-x-100",
//                               {
//                                 "scale-x-100": isActive,
//                               }
//                             )}
//                           />
//                         </Link>
//                       );
//                     })}
//                   </nav>

//                   {/* Mobile Authentication Section */}
//                   {/* {!isAuthenticated && (
//                     <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         asChild
//                         className="justify-start text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
//                       >
//                         <Link href="/login" onClick={() => setIsOpen(false)}>
//                           Login
//                         </Link>
//                       </Button>
//                       <Button
//                         size="sm"
//                         asChild
//                         className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
//                       >
//                         <Link href="/register" onClick={() => setIsOpen(false)}>
//                           Sign Up
//                         </Link>
//                       </Button>
//                     </div>
//                   )} */}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

////////////

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, LogOut, LayoutDashboard, Menu, Moon, Sun } from "lucide-react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle responsive behavior - close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Determine if navbar should be black (when scrollY < 50)
  const isBlackNavbar = scrollY < 50;

  return (
    <header
      className={cn(
        "shadow-sm border-b sticky top-0 z-50 transition-all duration-300",
        isBlackNavbar
          ? "bg-white dark:border-gray-50/[.1] dark:bg-gray-50/[.10]  border-gray-200"
          : "bg-black border-gray-800"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=56&width=56"
                  alt="Logo"
                  fill
                  className="object-contain rounded"
                  sizes="(max-width: 640px) 48px, 56px"
                  priority
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h1
                  className={cn(
                    "text-lg sm:text-2xl font-bold leading-tight transition-colors",
                    isBlackNavbar
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  )}
                >
                  eshop
                </h1>
                <Badge
                  variant="secondary"
                  className={cn(
                    "hidden sm:inline-flex text-xs transition-colors",
                    isBlackNavbar
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  Store
                </Badge>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Show on medium and large screens */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative transition-colors font-medium group py-2",
                    isBlackNavbar
                      ? isActive
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                      : isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
                      isBlackNavbar ? "bg-white" : "bg-gray-900 dark:bg-white",
                      {
                        "scale-x-100": isActive,
                      }
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group p-2">
              <AiOutlineShoppingCart
                className={cn(
                  "w-6 h-6 transition-colors",
                  isBlackNavbar
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                )}
              />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow min-w-[20px] h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "transition-colors",
                    isBlackNavbar
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Authentication */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "relative h-10 w-10 rounded-full transition-colors",
                      isBlackNavbar
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  align="end"
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                  {user.role === "admin" && (
                    <DropdownMenuItem
                      asChild
                      className="dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <Link
                        href="/dashboard/admin"
                        className="flex items-center"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className={cn(
                    "transition-colors",
                    isBlackNavbar
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className={cn(
                    "transition-colors",
                    isBlackNavbar
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
                  )}
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "md:hidden p-2 transition-colors",
                    isBlackNavbar
                      ? "text-gray-300 hover:text-white hover:bg-gray-800"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[250px] sm:w-[320px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Logo"
                        fill
                        className="object-contain rounded"
                        sizes="40px"
                      />
                    </div>
                    eshop
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col mt-1">
                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    {navigationLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 font-medium py-3 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group",
                            {
                              "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800":
                                isActive,
                            }
                          )}
                        >
                          {link.label}
                          {/* Mobile hover and active underline */}
                          <span
                            className={cn(
                              "absolute left-3 right-3 bottom-1 h-[2px] bg-gray-900 dark:bg-white origin-left transition-all duration-300 ease-out",
                              "scale-x-0 group-hover:scale-x-100",
                              {
                                "scale-x-100": isActive,
                              }
                            )}
                          />
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

/////////

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/lib/store";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { User, LogOut, LayoutDashboard, Menu, Moon, Sun } from "lucide-react";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";
// import { motion, AnimatePresence } from "framer-motion";

// export function Navbar() {
//   const { data: session, status } = useSession();
//   const isAuthenticated = status === "authenticated";
//   const user = session?.user;
//   const itemCount = useSelector((state: RootState) => state.cart.itemCount);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const pathname = usePathname();
//   const { theme, setTheme } = useTheme();

//   // Ensure component is mounted before rendering theme-dependent elements
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const navigationLinks = [
//     { href: "/products", label: "Products" },
//     { href: "/about", label: "About" },
//     { href: "/contact", label: "Contact" },
//   ];

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   return (
//     <header className="bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-md">
//       <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo Section */}
//           <motion.div
//             className="flex items-center gap-3"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Link href="/" className="flex items-center group">
//               <motion.div
//                 className="w-12 h-12 sm:w-14 sm:h-14 relative flex-shrink-0"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Image
//                   src="/placeholder.svg?height=56&width=56"
//                   alt="Logo"
//                   fill
//                   className="object-contain rounded"
//                   sizes="(max-width: 640px) 48px, 56px"
//                   priority
//                 />
//               </motion.div>
//               <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
//                 <motion.h1
//                   className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   eshop
//                 </motion.h1>
//                 <Badge
//                   variant="secondary"
//                   className="hidden sm:inline-flex text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-0"
//                 >
//                   Store
//                 </Badge>
//               </div>
//             </Link>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-6">
//             {navigationLinks.map((link, index) => {
//               const isActive = pathname === link.href;
//               return (
//                 <motion.div
//                   key={link.href}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   <Link
//                     href={link.href}
//                     className={cn(
//                       "relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium group py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
//                       {
//                         "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20":
//                           isActive,
//                       }
//                     )}
//                   >
//                     {link.label}
//                     <motion.span
//                       className="absolute inset-x-3 bottom-0 h-[2px] bg-blue-600 dark:bg-blue-400 origin-left"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: isActive ? 1 : 0 }}
//                       whileHover={{ scaleX: 1 }}
//                       transition={{ duration: 0.3, ease: "easeOut" }}
//                     />
//                   </Link>
//                 </motion.div>
//               );
//             })}
//           </nav>

//           {/* Right Side Actions */}
//           <motion.div
//             className="flex items-center gap-2 sm:gap-3"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Cart Icon */}
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 href="/cart"
//                 className="relative group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               >
//                 <AiOutlineShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
//                 <AnimatePresence>
//                   {itemCount > 0 && (
//                     <motion.span
//                       className="absolute -top-1 -right-1 bg-red-500 dark:bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 shadow-lg min-w-[20px] h-5 flex items-center justify-center"
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       exit={{ scale: 0, opacity: 0 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 500,
//                         damping: 30,
//                       }}
//                     >
//                       {itemCount}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </Link>
//             </motion.div>

//             {/* Theme Toggle */}
//             {mounted && (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                   >
//                     <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
//                     <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
//                     <span className="sr-only">Toggle theme</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   align="end"
//                   className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//                 >
//                   <DropdownMenuItem
//                     onClick={() => setTheme("light")}
//                     className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
//                   >
//                     <Sun className="mr-2 h-4 w-4" />
//                     Light
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setTheme("dark")}
//                     className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
//                   >
//                     <Moon className="mr-2 h-4 w-4" />
//                     Dark
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => setTheme("system")}
//                     className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
//                   >
//                     <LayoutDashboard className="mr-2 h-4 w-4" />
//                     System
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}

//             {/* User Authentication */}
//             {isAuthenticated && user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                   >
//                     <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//                   align="end"
//                 >
//                   <div className="flex items-center justify-start gap-2 p-2">
//                     <div className="flex flex-col space-y-1 leading-none">
//                       <p className="font-medium text-gray-900 dark:text-white">
//                         {user.name}
//                       </p>
//                       <p className="w-[200px] truncate text-sm text-gray-500 dark:text-gray-400">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>
//                   <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
//                   {user.role === "admin" && (
//                     <DropdownMenuItem
//                       asChild
//                       className="hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
//                     >
//                       <Link
//                         href="/dashboard/admin"
//                         className="flex items-center text-gray-900 dark:text-gray-100"
//                       >
//                         <LayoutDashboard className="mr-2 h-4 w-4" />
//                         Admin Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                   )}
//                   <DropdownMenuItem
//                     className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-gray-900 dark:text-gray-100"
//                     onClick={() => signOut({ callbackUrl: "/" })}
//                   >
//                     <LogOut className="mr-2 h-4 w-4" />
//                     Sign out
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   asChild
//                   className="hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <Link
//                     href="/login"
//                     className="text-gray-700 dark:text-gray-300"
//                   >
//                     Login
//                   </Link>
//                 </Button>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     size="sm"
//                     asChild
//                     className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
//                   >
//                     <Link href="/register">Sign Up</Link>
//                   </Button>
//                 </motion.div>
//               </div>
//             )}

//             {/* Mobile Menu */}
//             <Sheet open={isOpen} onOpenChange={setIsOpen}>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
//                   <span className="sr-only">Toggle menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent
//                 side="right"
//                 className="w-[300px] sm:w-[400px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
//               >
//                 <SheetHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
//                   <SheetTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
//                     <motion.div
//                       className="w-10 h-10 relative"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         delay: 0.1,
//                       }}
//                     >
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt="Logo"
//                         fill
//                         className="object-contain rounded"
//                         sizes="40px"
//                       />
//                     </motion.div>
//                     <motion.span
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       eshop
//                     </motion.span>
//                   </SheetTitle>
//                 </SheetHeader>

//                 {/* Navigation Links */}
//                 <div className="flex flex-col pt-6 space-y-2">
//                   {navigationLinks.map((link, index) => {
//                     const isActive = pathname === link.href;
//                     return (
//                       <motion.div
//                         key={link.href}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
//                       >
//                         <Link
//                           href={link.href}
//                           className={cn(
//                             "flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium group",
//                             {
//                               "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400":
//                                 isActive,
//                             }
//                           )}
//                           onClick={() => setIsOpen(false)}
//                         >
//                           <span className="flex-1">{link.label}</span>
//                           <AnimatePresence>
//                             {isActive && (
//                               <motion.div
//                                 className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 exit={{ scale: 0 }}
//                                 transition={{ type: "spring", stiffness: 500 }}
//                               />
//                             )}
//                           </AnimatePresence>
//                         </Link>
//                       </motion.div>
//                     );
//                   })}
//                 </div>

//                 {/* User Section */}
//                 {/* {isAuthenticated && user && (
//                   <motion.div
//                     className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     <div className="flex items-center gap-3 mb-4 px-4">
//                       <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
//                         <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
//                       </div>
//                       <div>
//                         <p className="font-medium text-gray-900 dark:text-white">
//                           {user.name}
//                         </p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                           {user.email}
//                         </p>
//                       </div>
//                     </div>

//                     {user.role === "admin" && (
//                       <motion.div
//                         whileHover={{ x: 4 }}
//                         whileTap={{ scale: 0.98 }}
//                       >
//                         <Link
//                           href="/dashboard/admin"
//                           className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-2"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           <LayoutDashboard className="mr-3 h-4 w-4" />
//                           Admin Dashboard
//                         </Link>
//                       </motion.div>
//                     )}

//                     <motion.button
//                       whileHover={{ x: 4 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         signOut({ callbackUrl: "/" });
//                         setIsOpen(false);
//                       }}
//                       className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
//                     >
//                       <LogOut className="mr-3 h-4 w-4" />
//                       Sign out
//                     </motion.button>
//                   </motion.div>
//                 )} */}
//               </SheetContent>
//             </Sheet>
//           </motion.div>
//         </div>
//       </div>
//     </header>
//   );
// }
