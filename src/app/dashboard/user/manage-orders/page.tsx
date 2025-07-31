// export default function UserOrdersPage() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">My Orders</h1>
//     </div>
//   );
// }

// "use client";

// import { format } from "date-fns";
// import { formatCurrency } from "@/lib/utils";
// import { Loader2, AlertCircle } from "lucide-react";
// import { useUserOrders } from "@/lib/hooks/useUserOrders";
// import Image from "next/image";
// import { Order, CartItem } from "@/types/types";

// export default function UserOrdersPage() {
//   const { data: orders, isLoading, isError } = useUserOrders();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
//       </div>
//     );
//   }

//   if (isError || !orders) {
//     return (
//       <div className="flex flex-col items-center justify-center h-60 text-red-500">
//         <AlertCircle className="w-6 h-6 mb-2" />
//         <p>Failed to load your orders.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order: Order) => (
//             <div
//               key={order.id}
//               className="border rounded-xl p-4 shadow-sm bg-white"
//             >
//               <div className="flex justify-between items-center mb-3">
//                 <div>
//                   <p className="font-semibold text-gray-700">Order ID:</p>
//                   <p className="text-sm text-gray-500">{order.id}</p>
//                 </div>
//                 <div className="text-sm text-right text-gray-600">
//                   <p>
//                     Status: <span className="font-medium">{order.status}</span>
//                   </p>
//                   {order.createdAt && (
//                     <p>{format(new Date(order.createdAt), "PPP")}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {order.items.map((item: CartItem) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-4 border rounded-md p-2"
//                   >
//                     <Image
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       width={64}
//                       height={64}
//                       className="w-16 h-16 object-cover rounded-md"
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-gray-500">
//                         Qty: {item.quantity}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Price: {formatCurrency(item.price)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 flex justify-end">
//                 <p className="font-semibold text-lg">
//                   Total: {formatCurrency(order.total)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

//////

"use client";

import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Loader2, AlertCircle } from "lucide-react";
import { useUserOrders } from "@/lib/hooks/useUserOrders";
import Image from "next/image";
import { Order, CartItem } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserOrdersPage() {
  const { data: orders, isLoading, isError } = useUserOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-red-500">
        <AlertCircle className="w-6 h-6 mb-2" />
        <p>Failed to load your orders.</p>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Orders</h2>
        <Badge variant="outline" className="text-sm">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </Badge>
      </div>

      {orders.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                No orders yet
              </h3>
              <p className="text-gray-500">
                You haven&apos;t placed any orders yet.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div key={order.id} className="overflow-hidden">
              <div className="bg-gray-50/50 border-b">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-lg">Order #{order.id}</div>
                    {order.createdAt && (
                      <p className="text-sm text-gray-500">
                        Placed on {format(new Date(order.createdAt), "PPP")}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                    <p className="text-lg font-semibold">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/30">
                      <TableHead className="w-16">#</TableHead>
                      <TableHead className="w-20">Image</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item: CartItem, index: number) => (
                      <TableRow key={item.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-medium text-gray-500">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 object-cover rounded-md border"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 line-clamp-2">
                              {item.name}
                            </p>
                            {/* {item.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">
                                {item.description}
                              </p>
                            )} */}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="font-mono">
                            {item.quantity}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.price)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="border-t bg-gray-50/30 p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Order Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
