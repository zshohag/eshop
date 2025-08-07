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
