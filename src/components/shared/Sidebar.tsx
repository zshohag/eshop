// "use client";

// import Link from "next/link";

// // Extend the session user type to include 'role'
// declare module "next-auth" {
//   interface User {
//     role?: string;
//   }
// }
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import {
//   LayoutDashboard,
//   Package,
//   Users,
//   CreditCard,
//   // Star,
//   Plus,
//   ShoppingCart,
//   Home,
// } from "lucide-react";
// import { useSession } from "next-auth/react";

// const adminLinks = [
//   { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
//   {
//     href: "/dashboard/admin/manage-products",
//     label: "Manage Products",
//     icon: Package,
//   },
//   { href: "/dashboard/admin/add-product", label: "Add Product", icon: Plus },
//   { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Users },
//   {
//     href: "/dashboard/admin/manage-orders",
//     label: "Manage Orders",
//     icon: ShoppingCart,
//   },
//   {
//     href: "/dashboard/admin/payment-history",
//     label: "Payments",
//     icon: CreditCard,
//   },
//   // { href: "/dashboard/admin/reviews", label: "Reviews", icon: Star },
// ];

// const userLinks = [
//   // { href: "/dashboard/user", label: "Dashboard", icon: LayoutDashboard },
//   {
//     href: "/dashboard/user/manage-orders",
//     label: "My Orders",
//     icon: ShoppingCart,
//   },
//   // { href: "/dashboard/user/payment", label: "Payment", icon: CreditCard },
//   // { href: "/dashboard/user/reviews", label: "My Reviews", icon: Star },
// ];

// export function Sidebar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const role = session?.user?.role || "user"; // default to user
//   //const  role = "admin"
//   const links = role === "admin" ? adminLinks : userLinks;

//   return (
//     <aside className="min-w-[250px] h-full border-r bg-white shadow-sm p-4">
//       <div className="mb-6">
//         <Link
//           href="/"
//           className="text-xl font-semi-bold text-gray-800 flex items-center gap-2"
//         >
//           <Home className="w-5 h-5" /> Home
//         </Link>
//       </div>
//       <nav className="space-y-2">
//         {links.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={cn(
//               "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100",
//               pathname === href && "bg-gray-100 text-blue-600"
//             )}
//           >
//             <Icon className="w-4 h-4" /> {label}
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// }



///

// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { useSession } from "next-auth/react"
// import { LayoutDashboard, Package, Users, CreditCard, Plus, ShoppingCart, Home } from "lucide-react"

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"

// // Extend the session user type to include 'role'
// declare module "next-auth" {
//   interface User {
//     role?: string
//   }
// }

// const adminLinks = [
//   { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
//   {
//     href: "/dashboard/admin/manage-products",
//     label: "Manage Products",
//     icon: Package,
//   },
//   { href: "/dashboard/admin/add-product", label: "Add Product", icon: Plus },
//   { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: Users },
//   {
//     href: "/dashboard/admin/manage-orders",
//     label: "Manage Orders",
//     icon: ShoppingCart,
//   },
//   {
//     href: "/dashboard/admin/payment-history",
//     label: "Payments",
//     icon: CreditCard,
//   },
// ]

// const userLinks = [
//   {
//     href: "/dashboard/user/manage-orders",
//     label: "My Orders",
//     icon: ShoppingCart,
//   },
// ]

// export function AppSidebar() {
//   const { data: session } = useSession()
//   const pathname = usePathname()
//   const role = session?.user?.role || "user"

//   const links = role === "admin" ? adminLinks : userLinks

//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//                   <Home className="size-4" />
//                 </div>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-semibold">Dashboard</span>
//                   <span className="truncate text-xs">{role === "admin" ? "Admin Panel" : "User Panel"}</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {links.map(({ href, label, icon: Icon }) => (
//                 <SidebarMenuItem key={href}>
//                   <SidebarMenuButton asChild isActive={pathname === href}>
//                     <Link href={href}>
//                       <Icon />
//                       <span>{label}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   )
// }


//

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import {
  Home,
  LayoutDashboard,
  Package,
  Users,
  CreditCard,
  Plus,
  ShoppingCart,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Extend the session user type to include 'role'
declare module "next-auth" {
  interface User {
    role?: string
  }
}

const adminLinks = [
  {
    title: "Admin Panel",
    url: "#",
    items: [
      { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
      { title: "Manage Products", url: "/dashboard/admin/manage-products", icon: Package },
      { title: "Add Product", url: "/dashboard/admin/add-product", icon: Plus },
      { title: "Manage Users", url: "/dashboard/admin/manage-users", icon: Users },
      { title: "Manage Orders", url: "/dashboard/admin/manage-orders", icon: ShoppingCart },
      { title: "Payments", url: "/dashboard/admin/payment-history", icon: CreditCard },
    ],
  },
]

const userLinks = [
  {
    title: "User Panel",
    url: "#",
    items: [
      { title: "My Orders", url: "/dashboard/user/manage-orders", icon: ShoppingCart },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role = session?.user?.role || "user"

  const navLinks = role === "admin" ? adminLinks : userLinks

  return (
    <Sidebar {...props} className="mt-10" >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Dashboard</span>
                  <span className="text-xs text-muted-foreground">{role === "admin" ? "Admin Panel" : "User Panel"}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navLinks.map((section) => (
              <SidebarMenuItem key={section.title}>
                <SidebarMenuButton asChild>
                  <a href="#" className="font-medium">
                    {section.title}
                  </a>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url} className="flex items-center gap-2">
                          <item.icon className="size-4" />
                          {item.title}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
