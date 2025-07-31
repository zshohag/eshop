// // lib/providers/redux-provider.tsx
// "use client";

// import { Provider } from 'react-redux';
// import { store } from '@/lib/store';

// export function ReduxProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <Provider store={store}>
//       {children}
//     </Provider>
//   );
// }

/// new update with persist

// components/providers/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import { ReactNode } from "react";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen flex items-center justify-center">
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              {/* <p className="text-gray-600 text-center">Loading...</p> */}
            </div>
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
