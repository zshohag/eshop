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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isScrolled = scrollY > 50;

  const navbarBg = isScrolled
    ? " bg-white dark:bg-[#222222] text-gray-700 dark:text-white  border-gray-200  dark:border-gray-700"
    : theme === "dark"
    ? "bg-[#222222] text-white border-gray-700"
    : "bg-white text-gray-700 border-gray-200";

  return (
    <header
      className={cn(
        "shadow-sm border-b sticky top-0 z-50 transition-all duration-300",
        navbarBg
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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
                <h1 className="text-lg sm:text-2xl font-bold leading-tight text-gray-700 dark:text-white">
                  eshop
                </h1>
                <Badge
                  variant="secondary"
                  className="hidden sm:inline-flex text-xs bg-gray-800 text-gray-300"
                >
                  Store
                </Badge>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative transition-colors font-medium group py-2",
                    isActive
                      ? "text-gray-700 dark:text-white"
                      : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-[2px] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100",
                      isActive && "scale-x-100",
                      "bg-gray-700 dark:bg-white"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative group p-2">
              <AiOutlineShoppingCart className="w-6 h-6 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors" />
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
                  className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
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
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
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
                    <DropdownMenuItem asChild>
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
                  size="sm"
                  asChild
                  className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-800 dark:hover:bg-gray-200"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden p-2 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <Menu className="h-5 w-5" />
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
                  <nav className="flex flex-col gap-2">
                    {navigationLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "relative text-gray-800 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 font-medium py-3 px-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group",
                            {
                              "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800":
                                isActive,
                            }
                          )}
                        >
                          {link.label}
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
