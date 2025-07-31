// lib/hooks/useAdminOrders.ts
import { useQuery } from "@tanstack/react-query";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      const res = await fetch("/api/orders/admin");
      if (!res.ok) throw new Error("Failed to fetch admin orders");
      return res.json();
    },
  });
};
