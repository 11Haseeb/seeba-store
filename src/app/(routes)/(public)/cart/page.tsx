"use client";

import React from "react";
import useCart from "@/hooks/cart-hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";
import CartProductCard from "./_components/cart-product-card";
import { ProductWithQuantity } from "@/components/cart/cart-product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cart = () => {
  const { loading, cart, cartProducts } = useCart();

  return (
    <section>
      <div className="px-2 md:px-4 lg:px-8 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">Cart</h2>
        <div className="flex max-md:flex-wrap justify-between">
          <div className="w-[68%] max-md:w-full space-y-3">
            {loading
              ? Array.from({ length: 2 }).map((_, index) => {
                  return <Skeleton key={index + 1} className="h-[250px]" />;
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
          <div className="w-[30%] max-md:w-full h-max border p-4 lg:p-6 rounded-md">
            <h3 className="text-2xl mb-2">
              <span className="text-zinc-800 font-bold">Total Price: </span>
              <span className="font-semibold text-zinc-700">
                {cart?.totalPrice}
              </span>
              <span className="text-green-500 font-semibold ml-2">PKR</span>
            </h3>
            <Button className="w-full" asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
