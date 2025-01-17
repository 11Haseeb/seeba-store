import { create } from "zustand";

// Types
interface RefetchStates {
  refetch: boolean;
  offRefetch: () => void;
  onRefetch: () => void;
}

// Use Products Refetch
const useProductsRefetch = create<RefetchStates>((set) => ({
  refetch: false,
  offRefetch: () => set({ refetch: false }),
  onRefetch: () => set({ refetch: true }),
}));

// Use Customers Refetch
const useCustomersRefetch = create<RefetchStates>((set) => ({
  refetch: false,
  offRefetch: () => set({ refetch: false }),
  onRefetch: () => set({ refetch: true }),
}));

// Use Cart Refetch
const useCartRefetch = create<RefetchStates>((set) => ({
  refetch: false,
  offRefetch: () => set({ refetch: false }),
  onRefetch: () => set({ refetch: true }),
}));

export { useProductsRefetch, useCustomersRefetch, useCartRefetch };
