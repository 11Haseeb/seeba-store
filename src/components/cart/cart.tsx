"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import CartItems from "./cart-items";
import CartFooter from "./cart-footer";
import useCart from "@/hooks/cart-hooks/use-cart";
import { Product } from "@prisma/client";

const Cart = () => {
  const { loading, cart, cartProducts } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="max-[390px]:p-2" variant="outline">
          <ShoppingBag />
          <span>{cartProducts.length}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mt-2">
          <SheetTitle>Your Cart.</SheetTitle>
          <SheetDescription>
            Here you can view and manage your cart items.
          </SheetDescription>
        </SheetHeader>
        <CartItems
          loading={loading}
          cartProducts={cartProducts as unknown as Product[]}
        />
        <h4>
          <span className="font-bold">Total Price: </span>
          {loading ? "000" : !cart?.totalPrice ? "0" : cart?.totalPrice}{" "}
          <span className="text-green-500">PKR</span>
        </h4>
        <CartFooter />
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
