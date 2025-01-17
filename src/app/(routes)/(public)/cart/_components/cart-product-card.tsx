"use client";

import { ProductWithQuantity } from "@/components/cart/cart-product-card";
import QuantityBtn from "@/components/quantity-btn";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import useRemoveFromCart from "@/hooks/cart-hooks/use-remove-from-cart";

const CartProductCard = ({
  cartProduct,
}: {
  cartProduct: ProductWithQuantity;
}) => {
  const { id, mainImage, name, price, discountedPrice } = cartProduct;

  const { loading, handleRemoveFromCart } = useRemoveFromCart({
    productId: id,
  });

  return (
    <div className="p-4 relative border">
      <Button
        className="text-zinc-200 bg-red-500 hover:bg-red-600 absolute -top-2 -right-2 rounded-full"
        size="icon"
        aria-label={loading ? "Removing from cart" : "Remove from cart"}
        onClick={handleRemoveFromCart}
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : <X />}
      </Button>
      <div className="flex max-md:flex-wrap items-center gap-4 lg:gap-6">
        <Link href={`/product/${id}`}>
          <Image src={mainImage} alt={name} width={200} height={100} />
        </Link>
        <div>
          <h3 className="text-xl font-semibold">
            <span className="font-bold">Name: </span>
            <span className="text-zinc-800">{name}</span>
          </h3>
          <p className="text-lg font-bold">
            <span className="font-bold">Price: </span>
            <span className="text-zinc-700">
              {discountedPrice > 0 ? discountedPrice : price}{" "}
              <span className="text-green-500 font-bold">PKR</span>
            </span>
          </p>
          <QuantityBtn product={cartProduct} />
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
