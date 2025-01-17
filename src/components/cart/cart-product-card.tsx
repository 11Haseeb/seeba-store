import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import useRemoveFromCart from "@/hooks/cart-hooks/use-remove-from-cart";

export interface ProductWithQuantity extends Product {
  quantity: number;
}

interface Props {
  cartProduct: ProductWithQuantity;
}

const CartProductCard = ({ cartProduct }: Props) => {
  const { id, mainImage, name, price, discountedPrice, quantity } = cartProduct;

  const { loading, handleRemoveFromCart } = useRemoveFromCart({
    productId: id,
  });

  return (
    <div className="flex justify-between items-center border rounded-md">
      <Link href={`/products/${id}`}>
        <div className="flex items-center gap-2">
          <Image
            src={mainImage || "/product.png"}
            height={80}
            width={80}
            alt={name}
          />
          <div>
            <h2>{name}</h2>
            <h3 className="text-sm">
              {discountedPrice > 0 ? discountedPrice : price} x {quantity} ={" "}
              {(discountedPrice > 0 ? discountedPrice : price) * quantity}{" "}
              <span className="text-green-500 font-semibold">PKR</span>
            </h3>
          </div>
        </div>
      </Link>
      <Button
        className="bg-red-500 hover:bg-red-600 mr-2"
        size="icon"
        disabled={loading}
        onClick={handleRemoveFromCart}
      >
        {loading ? <Loader2 className="animate-spin" /> : <Trash2 />}
      </Button>
    </div>
  );
};

export default CartProductCard;
