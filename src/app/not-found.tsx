"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-center px-4">
      {/* Animated 404 */}
      <div className="relative mb-8">
        <h1 className="text-9xl md:text-[12rem] font-black text-slate-200 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Search className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Error Message */}
      <div className="max-w-md mx-auto mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. It might have
          been moved, deleted, or you entered the wrong URL.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Link>
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-32 left-16 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-50 delay-500"></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-pulse opacity-70 delay-700"></div>

      {/* Footer */}
      <div className="absolute bottom-8 text-sm text-slate-500">
        {/* <p>Error Code: 404 | Page Not Found</p> */}
      </div>
    </div>
  );
}
