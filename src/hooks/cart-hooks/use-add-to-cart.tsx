"use client";

import axios from "axios";
import { useTransition } from "react";
import useCurrentUser from "../use-user";
import { CartProduct } from "@prisma/client";
import { useToast } from "../use-toast";
import { useCartRefetch } from "@/store/refetchStates";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const useAddToCart = ({ productId, quantity, price }: CartProduct) => {
  const { isSignedIn } = useUser();
  const { push } = useRouter();
  const [loading, start] = useTransition();
  const { currentUser } = useCurrentUser();

  const { toast } = useToast();
  const { onRefetch } = useCartRefetch();

  const handleAddToCart = () => {
    if (!isSignedIn) {
      push("/sign-in");
      return;
    }

    start(async () => {
      try {
        const response = await axios.post(`/api/cart`, {
          userId: currentUser?.id,
          productId,
          quantity,
          price,
        });

        if (response.status === 201 || response.status === 200) {
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

  return { loading, handleAddToCart };
};

export default useAddToCart;
