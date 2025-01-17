"use client";

import axios from "axios";
import { useTransition } from "react";
import { useToast } from "../use-toast";
import { useCartRefetch } from "@/store/refetchStates";

const useRemoveFromCart = ({ productId }: { productId: string }) => {
  const [loading, start] = useTransition();

  const { toast } = useToast();
  const { onRefetch } = useCartRefetch();

  const handleRemoveFromCart = () => {
    start(async () => {
      try {
        const response = await axios.patch("/api/cart", { productId });

        if (response.status === 200) {
          toast({
            title: response.statusText,
            description: response.data.message,
          });
          onRefetch();
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            title: error.response?.statusText,
            description: error.response?.data.message,
          });
        }
      }
    });
  };

  return { loading, handleRemoveFromCart };
};

export default useRemoveFromCart;
