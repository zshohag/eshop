// // /////////

// import { CartItem } from "@/types/types";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartState {
//   items: CartItem[];
//   total: number;
//   itemCount: number;
//   isOpen: boolean;
// }

// const initialState: CartState = {
//   items: [],
//   total: 0,
//   itemCount: 0,
//   isOpen: false,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Accept CartItem instead of Product
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );

//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         // Payload is already a CartItem, so no conversion needed
//         state.items.push({
//           ...action.payload,
//           quantity: 1, // Ensure quantity starts at 1 for new items
//         });
//       }

//       cartSlice.caseReducers.calculateTotals(state);
//     },

//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//       cartSlice.caseReducers.calculateTotals(state);
//     },

//     updateQuantity: (
//       state,
//       action: PayloadAction<{ id: string; quantity: number }>
//     ) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity = Math.max(0, action.payload.quantity);
//         if (item.quantity === 0) {
//           state.items = state.items.filter((i) => i.id !== action.payload.id);
//         }
//       }
//       cartSlice.caseReducers.calculateTotals(state);
//     },

//     clearCart: (state) => {
//       state.items = [];
//       state.total = 0;
//       state.itemCount = 0;
//     },

//     toggleCart: (state) => {
//       state.isOpen = !state.isOpen;
//     },

//     calculateTotals: (state) => {
//       state.itemCount = state.items.reduce(
//         (total, item) => total + item.quantity,
//         0
//       );
//       state.total = state.items.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       );
//     },
//   },
// });

// export const {
//   addToCart,
//   removeFromCart,
//   updateQuantity,
//   clearCart,
//   toggleCart,
//   calculateTotals,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// reload  issue 

// lib/store/slices/cartSlice.ts - Simplified without manual localStorage
import { CartItem } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      }
      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    calculateTotals: (state) => {
      state.itemCount = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
