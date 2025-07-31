import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { Product } from "@/types/types"


// API functions
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products")
  if (!response.ok) throw new Error("Failed to fetch products")
  return response.json()
}

// Fetch a single product by ID
const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`)
  if (!response.ok) throw new Error("Failed to fetch product")
  return response.json()
}

// Create a new product
const createProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
  if (!response.ok) throw new Error("Failed to create product")
  return response.json()
}

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch a single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  })
}


// Hook to create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}


// Hook to update an existing product
// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async ({ id, ...product }: Product) => {
//       const response = await fetch(`/api/products/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       })
//       if (!response.ok) throw new Error("Failed to update product")
//       return response.json()
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["products"] })
//       queryClient.invalidateQueries({ queryKey: ["product", data.id] })
//     },
//   })
// }

// Updated useUpdateProduct hook with better error handling
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (product: Product) => {
      console.log("Updating product:", product); // Debug log
      
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", response.status, errorData);
        throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log("Update successful:", result); // Debug log
      return result;
    },
    onSuccess: (data) => {
      console.log("Mutation success, invalidating queries for:", data.id);
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["product", data.id] })
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    }
  })
}

/// HOOK FOR DELETING A PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
 
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete product")
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
