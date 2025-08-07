"use client";

import EcommerceCatalog from "@/components/Product-Area";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

const promos = [
  "Premium skincare, cosmetics & wellness products",
  "Everything your little one needs – safe & gentle",
  "Transform your space with quality essentials",
  "Farm-fresh produce & pantry staples delivered",
  "Sweet treats & gourmet chocolates for every occasion",
  "Unleash creativity with premium art supplies",
  "Beautiful gardens start with quality tools & plants",
];

const page = () => {
  return (
    <div>
      {/* <div className="max-w-7xl w-full px-4 py-2 mx-auto mt-6 mb-6 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white shadow-md rounded-md"> */}
      <div className="max-w-7xl w-full px-4 py-2 mx-auto mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  text-white shadow-md rounded-md mb-6 ">
        <Marquee pauseOnHover className="[--duration:50s]">
          {promos.map((text, index) => (
            <div
              key={index}
              className={cn(
                "mx-6 flex items-center gap-2 text-sm md:text-base font-medium tracking-wide"
              )}
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              {text}
            </div>
          ))}
        </Marquee>
      </div>

      <EcommerceCatalog />
    </div>
  );
};

export default page;
