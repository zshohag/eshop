// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Product } from "@/types/types"
// import { toast } from "react-hot-toast"
// import { useDeleteProduct, useProducts } from "@/lib/api/products"

// export default function ManageProducts() {
//   const router = useRouter()
//   const { data: products, isLoading, error } = useProducts()
//   const deleteProductMutation = useDeleteProduct()
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   // const handleEdit = (productId: string) => {
//   //   router.push(`/products/edit/${productId}`)
//   // }

//   const handleEdit = (productId: string) => {
//   router.push(`/dashboard/admin/manage-products/${productId}/edit`)
// }

//   const handleDelete = async (product: Product) => {
//     if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return
//     setDeletingId(product.id)
//     try {
//       await deleteProductMutation.mutateAsync(product.id)
//       toast.success(`"${product.name}" deleted successfully!`)
//     } catch (error) {
//       console.log(error)
//       toast.error("Failed to delete product. Please try again.")
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <span className="ml-2 text-gray-600">Loading products...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <p className="text-red-800">Error loading products. Please try again.</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Manage Products</h1>
//         <button
//           onClick={() => router.push("/products/add")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           Add New Product
//         </button>
//       </div>

//       {!products || products.length === 0 ? (
//         <div className="text-center py-12">
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//           <p className="text-gray-600 mb-4">Get started by creating your first product.</p>
//           <button
//             onClick={() => router.push("/products/add")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//           >
//             Add Product
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product: Product) => (
//                   <tr key={product.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {product.images?.length > 0 && (
//                           <div className="flex-shrink-0 h-10 w-10">
//                             <img
//                               className="h-10 w-10 rounded-md object-cover"
//                               src={product.images[0]}
//                               alt={product.name}
//                             />
//                           </div>
//                         )}
//                         <div className={product.images?.length > 0 ? "ml-4" : ""}>
//                           <div className="text-sm font-medium text-gray-900">{product.name}</div>
//                           <div className="text-sm text-gray-500 truncate max-w-xs">
//                             {product.description}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {product.quantity} units
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       }`}>
//                         {product.inStock ? "In Stock" : "Out of Stock"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex items-center justify-end space-x-2">
//                         <button
//                           onClick={() => handleEdit(product.id)}
//                           className="text-blue-600 hover:text-blue-900"
//                           title="Edit"
//                         >
//                           EDIT
//                         </button>
//                         <button
//                           onClick={() => handleDelete(product)}
//                           disabled={deletingId === product.id}
//                           className="text-red-600 hover:text-red-900 disabled:opacity-50"
//                           title="Delete"
//                         >
//                           {deletingId === product.id ? (
//                             <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
//                           ) : (
//                             "🗑️"
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
///////////

// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import type { Product } from "@/types/types"
// import { toast } from "react-hot-toast"
// import { useDeleteProduct, useProducts } from "@/lib/api/products"
// import { Edit, Plus, Trash2, Loader2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Skeleton } from "@/components/ui/skeleton"

// export default function ManageProducts() {
//   const router = useRouter()
//   const { data: products, isLoading, error } = useProducts()
//   const deleteProductMutation = useDeleteProduct()
//   const [deletingId, setDeletingId] = useState<string | null>(null)

//   const handleEdit = (productId: string) => {
//     router.push(`/dashboard/admin/manage-products/${productId}/edit`)
//   }

//   const handleDelete = async (product: Product) => {
//     if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return

//     setDeletingId(product.id)
//     try {
//       await deleteProductMutation.mutateAsync(product.id)
//       toast.success(`"${product.name}" deleted successfully!`)
//     } catch (error) {
//       console.log(error)
//       toast.error("Failed to delete product. Please try again.")
//     } finally {
//       setDeletingId(null)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Manage Products</h1>
//           <Skeleton className="h-10 w-32" />
//         </div>
//         <Card>
//           <CardContent className="p-6">
//             <div className="space-y-4">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <div key={i} className="flex items-center space-x-4">
//                   <Skeleton className="h-10 w-10 rounded-md" />
//                   <div className="space-y-2 flex-1">
//                     <Skeleton className="h-4 w-48" />
//                     <Skeleton className="h-3 w-32" />
//                   </div>
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-8 w-20" />
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="p-6 space-y-6">
//         <h1 className="text-2xl font-bold">Manage Products</h1>
//         <Alert variant="destructive">
//           <AlertDescription>Error loading products. Please try again.</AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Manage Products</h1>
//         <Button onClick={() => router.push("/products/add")} className="flex items-center gap-2">
//           <Plus className="h-4 w-4" />
//           Add New Product
//         </Button>
//       </div>

//       {!products || products.length === 0 ? (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-12">
//             <div className="text-center space-y-4">
//               <h3 className="text-lg font-medium">No products found</h3>
//               <p className="text-muted-foreground">Get started by creating your first product.</p>
//               <Button onClick={() => router.push("/products/add")} className="flex items-center gap-2">
//                 <Plus className="h-4 w-4" />
//                 Add Product
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle>Products ({products.length})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="rounded-md border">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Quantity</TableHead>
//                     <TableHead>Stock</TableHead>
//                     <TableHead className="text-right">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {products.map((product: Product) => (
//                     <TableRow key={product.id}>
//                       <TableCell>
//                         <div className="flex items-center gap-3">
//                           {product.images?.length > 0 && (
//                             <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
//                               <img
//                                 className="h-full w-full object-cover"
//                                 src={product.images[0] || "/placeholder.svg"}
//                                 alt={product.name}
//                               />
//                             </div>
//                           )}
//                           <div className="space-y-1">
//                             <div className="font-medium">{product.name}</div>
//                             <div className="text-sm text-muted-foreground truncate max-w-xs">{product.description}</div>
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{product.category}</TableCell>
//                       <TableCell>${product.price.toFixed(2)}</TableCell>
//                       <TableCell>{product.quantity} units</TableCell>
//                       <TableCell>
//                         <Badge variant={product.inStock ? "default" : "destructive"}>
//                           {product.inStock ? "In Stock" : "Out of Stock"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex items-center justify-end gap-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleEdit(product.id)}
//                             className="h-8 w-8 p-0"
//                           >
//                             <Edit className="h-4 w-4" />
//                             <span className="sr-only">Edit product</span>
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleDelete(product)}
//                             disabled={deletingId === product.id}
//                             className="h-8 w-8 p-0 text-destructive hover:text-destructive"
//                           >
//                             {deletingId === product.id ? (
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                             ) : (
//                               <Trash2 className="h-4 w-4" />
//                             )}
//                             <span className="sr-only">Delete product</span>
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }

//////

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/types";
import { toast } from "react-hot-toast";
import { useDeleteProduct, useProducts } from "@/lib/api/products";
import { Edit, Plus, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

export default function ManageProducts() {
  const router = useRouter();
  const { data: products, isLoading, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Pagination calculations
  const totalItems = products?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex) || [];

  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/admin/manage-products/${productId}/edit`);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeletingId(product.id);
    try {
      await deleteProductMutation.mutateAsync(product.id);
      toast.success(`"${product.name}" deleted successfully!`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Alert variant="destructive">
          <AlertDescription>
            Error loading products. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products - ({totalItems})</h1>
        <Button
          onClick={() => router.push("/dashboard/admin/add-product")}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {!products || products.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">
                Get started by creating your first product.
              </p>
              <Button
                onClick={() => router.push("/products/add")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="mt-3">
              {/* Products ({totalItems}) */}
              {totalPages > 1 && (
                <span className="text-sm font-normal text-muted-foreground ml-2 ">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No.</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.map((product: Product, index) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium text-muted-foreground">
                        {startIndex + index + 1}.
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {product.images?.length > 0 && (
                            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted relative">
                              <Image
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="space-y-1">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.quantity} units</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.inStock ? "default" : "destructive"}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit product</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product.id}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            <span className="sr-only">Delete product</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center pt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1);

                        if (!showPage) {
                          // Show ellipsis for gaps
                          if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        }

                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
