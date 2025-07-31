// // lib/store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './slices/cartSlice';
// import orderReducer from './slices/orderSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     order: orderReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// updated with persist
// lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

// Configure persist for cart only
const cartPersistConfig = {
  key: 'cart',
  storage,
  // Only persist these fields (exclude isOpen)
  whitelist: ['items', 'total', 'itemCount']
};

// Configure persist for the entire root if needed
const rootPersistConfig = {
  key: 'root',
  storage,
  // Only persist cart, not order
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  order: orderReducer, // Not persisted
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
