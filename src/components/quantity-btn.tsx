"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader, Minus, Plus } from "lucide-react";
import useAddToCart from "@/hooks/cart-hooks/use-add-to-cart";
import { Product } from "@prisma/client";
import useCart from "@/hooks/cart-hooks/use-cart";

const QuantityBtn = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => setQuantity((prev) => Math.max(0, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(6, prev + 1));

  const { loading, handleAddToCart } = useAddToCart({
    productId: product?.id,
    price:
      product?.discountedPrice > 0 ? product?.discountedPrice : product?.price,
    quantity,
  });

  const { cartProducts } = useCart();

  const existedProductInCart = cartProducts.some(
    (cartProduct) => cartProduct.id === product?.id
  );

  return (
    <div className="grid gap-2">
      <div
        className="inline-flex items-center"
        role="group"
        aria-labelledby="quantity-control"
      >
        <span className="text-xl font-bold mr-2" id="quantity-control">
          Quantity Control:
        </span>
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          aria-label="Decrease quantity"
          onClick={decreaseQuantity}
          disabled={quantity === 1}
        >
          <Minus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <div
          className="flex items-center px-3 text-sm font-medium tabular-nums"
          aria-live="polite"
        >
          <span className="ms-2" aria-label={`Current quantity is ${quantity}`}>
            {quantity}
          </span>
        </div>
        <Button
          className="rounded-full"
          variant="outline"
          size="icon"
          aria-label="Increase quantity"
          onClick={increaseQuantity}
          disabled={quantity === 6}
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
      <Button
        variant={existedProductInCart ? "outline" : "default"}
        className="mt-4"
        aria-label={loading ? "Adding.." : "Add To Cart"}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? (
          <>
            {existedProductInCart ? "Updating" : "Adding"}{" "}
            <Loader className="animate-spin" />
          </>
        ) : existedProductInCart ? (
          "Update"
        ) : (
          "Add To Cart"
        )}
      </Button>
    </div>
  );
};

export default QuantityBtn;
