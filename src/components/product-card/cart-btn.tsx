"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import useAddToCart from "@/hooks/cart-hooks/use-add-to-cart";
import useCart from "@/hooks/cart-hooks/use-cart";

const CartBtn = ({
  id,
  price,
  discountedPrice,
}: {
  id: string;
  price: number;
  discountedPrice: number;
}) => {
  const { loading, handleAddToCart } = useAddToCart({
    productId: id,
    quantity: 1,
    price: discountedPrice > 0 ? discountedPrice : price,
  });

  const { cartProducts } = useCart();

  const existedProductInCart = cartProducts.some(
    (cartProduct) => cartProduct.id === id
  );

  return (
    <Button
      variant={existedProductInCart ? "outline" : "default"}
      className="w-full"
      aria-label={loading ? "Adding to cart" : "Add to cart"}
      onClick={handleAddToCart}
      disabled={loading || existedProductInCart}
    >
      {loading ? (
        <>
          Adding <Loader className="animate-spin" />
        </>
      ) : existedProductInCart ? (
        "Added"
      ) : (
        "Add To Cart"
      )}
    </Button>
  );
};

export default CartBtn;
