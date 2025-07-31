// "use client"

// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
// import { useCart } from "@/context/CartContext"

// export function ShoppingCartSheet() {
//   const { state, dispatch } = useCart()

//   const updateQuantity = (id: string, quantity: number) => {
//     dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
//   }

//   const removeItem = (id: string) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id })
//   }

//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" })
//   }

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="relative bg-transparent">
//           <ShoppingCart className="w-5 h-5" />
//           {state.itemCount > 0 && (
//             <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
//               {state.itemCount}
//             </Badge>
//           )}
//         </Button>
//       </SheetTrigger>

//       <SheetContent className="w-full sm:max-w-lg">
//         <SheetHeader>
//           <SheetTitle className="flex items-center gap-2">
//             <ShoppingCart className="w-5 h-5" />
//             Shopping Cart ({state.itemCount} items)
//           </SheetTitle>
//         </SheetHeader>

//         <div className="flex flex-col h-full">
//           {state.items.length === 0 ? (
//             <div className="flex-1 flex items-center justify-center">
//               <div className="text-center">
//                 <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
//                 <p className="text-gray-500">Add some products to get started!</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {/* Cart Items */}
//               <div className="flex-1 overflow-y-auto py-4 space-y-4">
//                 {state.items.map((item) => (
//                   <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
//                     <div className="relative w-16 h-16 flex-shrink-0">
//                       {/* <Image
//                         src={item.image || "/placeholder.svg"}
//                         alt={item.name}
//                         fill
//                         className="object-cover rounded"
//                         sizes="64px"
//                       /> */}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
//                       <p className="text-lg font-bold text-gray-900">${item.price}</p>

//                       <div className="flex items-center gap-2 mt-2">
//                         <Button
//                           size="icon"
//                           variant="outline"
//                           className="h-8 w-8 bg-transparent"
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         >
//                           <Minus className="w-3 h-3" />
//                         </Button>

//                         <span className="w-8 text-center font-semibold">{item.quantity}</span>

//                         <Button
//                           size="icon"
//                           variant="outline"
//                           className="h-8 w-8 bg-transparent"
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         >
//                           <Plus className="w-3 h-3" />
//                         </Button>

//                         <Button
//                           size="icon"
//                           variant="ghost"
//                           className="h-8 w-8 text-red-500 hover:text-red-700 ml-auto"
//                           onClick={() => removeItem(item.id)}
//                         >
//                           <Trash2 className="w-3 h-3" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Cart Summary */}
//               <div className="border-t pt-4 space-y-4">
//                 <div className="flex justify-between items-center text-lg font-semibold">
//                   <span>Total:</span>
//                   <span>${state.total.toFixed(2)}</span>
//                 </div>

//                 <div className="space-y-2">
//                   <Button className="w-full" size="lg">
//                     <CreditCard className="w-4 h-4 mr-2" />
//                     Checkout - ${state.total.toFixed(2)}
//                   </Button>

//                   <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
//                     Clear Cart
//                   </Button>
//                 </div>

//                 <div className="text-center text-sm text-gray-500">
//                   <p>🚚 Free shipping on orders over $50</p>
//                   <p>🔒 Secure checkout guaranteed</p>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }
