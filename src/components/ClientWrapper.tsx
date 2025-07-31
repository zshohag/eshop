// src/components/ClientWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/shared/Footer";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}
