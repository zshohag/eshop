// useUserOrders.ts
import { useQuery } from "@tanstack/react-query";

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const res = await fetch("/api/orders/user-orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });
};
