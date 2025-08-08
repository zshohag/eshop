"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Tag,
  Star,
  Heart,
  Baby,
  Home,
  ShoppingCart,
  Palette,
  Flower2,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-gray-100 dark:bg-[#222222]">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to eshop Store
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate destination for everything you need and love. From
            health & beauty essentials to home comforts, we bring you quality
            products across all categories of life.
          </p>
          <div className="mt-6">
            <Link href="/products">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-50/[.10]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Heart className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Health & Beauty
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Baby className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Baby Products
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Home className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Home & Kitchen
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <ShoppingCart className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Grocery & Gourmet Food
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Palette className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Art & Craft
              </h3>
            </div>
            <div className="bg-white dark:bg-gray-50/[.10] p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <Flower2 className="w-8 h-8 mx-auto text-gray-900 dark:text-white mb-3" />
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                Patio, Lawn & Garden
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Why Shop With Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-50 dark:bg-gray-50/[.10] p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Truck className="w-12 h-12 mx-auto text-gray-900 dark:text-white mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Free Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              On orders over $100 — Today only!
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-semibold"
              >
                Order Now →
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-50/[.10] p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Tag className="w-12 h-12 mx-auto text-gray-900 dark:text-white mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Big Discounts
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Save up to 50% on your favorite products across all categories.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-semibold"
              >
                Shop Deals →
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-50/[.10] p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Sparkles className="w-12 h-12 mx-auto text-gray-900 dark:text-white mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              New Arrivals
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Explore the latest products in health, beauty, home, and more.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-semibold"
              >
                Explore →
              </Button>
            </Link>
          </div>

          <div className="bg-gray-50 dark:bg-gray-50/[.10] p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Star className="w-12 h-12 mx-auto text-gray-900 dark:text-white mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              Premium Collection
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Shop premium products with exclusive VIP member discounts.
            </p>
            <Link href="/products">
              <Button
                variant="link"
                className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-semibold"
              >
                View Collection →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Text */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-50/[.10]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Why Choose eshop Store?
          </h2>
          <div className="bg-white dark:bg-gray-50/[.10] p-8 rounded-2xl shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
              At eshop Store, we believe shopping should be exciting, easy, and
              affordable. Whether you&apos;re looking for health & beauty
              essentials, baby products, home & kitchen necessities, fresh
              groceries, sweet treats, creative art supplies, or garden tools —
              we&apos;ve got you covered.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our curated collections span across all aspects of your life,
              ensuring you find exactly what you need with fast shipping,
              reliable support, and unbeatable prices. From everyday essentials
              to special treats, we make shopping a delightful experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-white dark:bg-[#222222] text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Ready to discover amazing deals across all categories?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join thousands of happy customers who trust eshop Store for all
            their shopping needs.
          </p>
          <Link href="/products">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
