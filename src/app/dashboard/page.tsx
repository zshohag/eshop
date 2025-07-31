// // src/app/dashboard/page.tsx
// import Link from "next/link";

// export default function DashboardHome() {
//   return (
//     <div className="max-w-2xl mx-auto py-20 text-center">
//       <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
//       <p className="mb-6 text-gray-600">Choose your dashboard type:</p>
//       <div className="flex justify-center gap-4">
//         <Link
//           href="/dashboard/admin"
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Admin Dashboard
//         </Link>
//         <Link
//           href="/dashboard/user"
//           className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           User Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }

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

