
"use client"

import React, { useState } from "react"
import { useProducts } from "@/lib/api/products"
import { Product } from "@/types/types"
import { ProductCard } from "./ProductCard"
import { ProductDetailsModal } from "./ProductDetailsModal"

export default function TopRatedProductGrid() {
  const { data: products = [], isLoading, isError } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
    setModalOpen(false)
  }

  // Filter Top Rated only
  const topRated = products.filter((product) => product.badge === "Best Seller")

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (isError) return <div className="text-red-500 text-center py-10">Failed to load products.</div>
  if (topRated.length === 0) return <div className="text-center py-10 text-gray-500">No top rated products.</div>

  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Rated Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked top-rated products based on customer feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRated.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {/* Product Details Modal */}
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  )
}
