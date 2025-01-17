"use client";

import { useUser } from "@clerk/nextjs";
import { Cart, CartProduct, Product } from "@prisma/client";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { useCartRefetch } from "@/store/refetchStates";

const useCart = () => {
  const { isSignedIn } = useUser();
  const [loading, start] = useTransition();
  const [cart, setCart] = useState<Cart>();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const { refetch, offRefetch } = useCartRefetch();

  useEffect(() => {
    if (!isSignedIn) return;

    const fetchCart = () => {
      start(async () => {
        const cartResponse = await axios.get(`/api/cart`);

        if (cartResponse.status === 200) {
          const cartData = cartResponse.data.data;
          setCart(cartData);
          offRefetch();

          if (cartData?.cartProducts && cartData.cartProducts.length > 0) {
            const cartProductsResponse = await Promise.all(
              cartData.cartProducts.map(async (cartProduct: CartProduct) => {
                const productResponse = await axios.get(
                  `/api/product?id=${cartProduct.productId}`
                );

                if (productResponse.status === 200) {
                  return {
                    ...productResponse.data.data,
                    quantity: cartProduct.quantity,
                  };
                }
              })
            );

            setCartProducts(cartProductsResponse);
          }
        }
      });
    };

    fetchCart();
  }, [refetch]);

  return { loading, cart, cartProducts };
};

export default useCart;
