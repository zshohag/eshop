// src/app/dashboard/page.tsx


import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Not logged in → send to login
    return redirect("/login");
  }

  const role = session?.user?.role;

  if (role === "admin") {
    return redirect("/dashboard/admin");
  } else {
    return redirect("/dashboard/user");
  }
}

