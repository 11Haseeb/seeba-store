"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import { Product } from "@prisma/client";
import CartProductCard, { ProductWithQuantity } from "./cart-product-card";
import { Skeleton } from "@/components/ui/skeleton";

const CartItems = ({
  loading,
  cartProducts,
}: {
  loading: boolean;
  cartProducts: Product[];
}) => {
  const { userId } = useAuth();
  const showBox = !userId || cartProducts.length === 0;

  return (
    <ScrollArea
      className={`p-1 my-4 h-1/2 grid ${
        showBox && "place-items-center"
      }  border rounded`}
    >
      {showBox && (
        <div className="grid place-items-center text-center space-y-2">
          <h5 className="semibold">
            {!userId
              ? "Login to view your cart items."
              : cartProducts.length === 0
              ? "Your cart is empty."
              : null}
          </h5>
          <Button size="sm" asChild>
            <a
              href={`/${
                !userId
                  ? "sign-in"
                  : cartProducts.length === 0
                  ? "products"
                  : ""
              }`}
            >
              {!userId
                ? "Login"
                : cartProducts.length === 0
                ? "Shop Now"
                : null}
            </a>
          </Button>
        </div>
      )}

      <div className="space-y-2">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => {
              return <Skeleton key={index + 1} className="h-[80px]" />;
            })
          : cartProducts.map((cartProduct) => {
              return (
                <CartProductCard
                  key={cartProduct.name.toLowerCase().replace(" ", "-")}
                  cartProduct={cartProduct as ProductWithQuantity}
                />
              );
            })}
      </div>
    </ScrollArea>
  );
};

export default CartItems;
