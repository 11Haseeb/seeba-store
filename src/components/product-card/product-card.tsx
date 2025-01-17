import React from "react";
import { Product } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import CartBtn from "./cart-btn";

const ProductCard = ({
  product: { id, mainImage, name, price, discountedPrice, discountPercentage },
}: {
  product: Product;
}) => {
  return (
    <Card className="relative">
      <Link href={`/product/${id}`}>
        <CardHeader className="p-0 grid place-content-center">
          {discountPercentage > 0 && (
            <Badge className="text-sm text-zinc-100 bg-red-500 hover:bg-red-500 absolute top-2 left-2">
              {discountPercentage} % OFF
            </Badge>
          )}
          <Image
            src={mainImage || "/product.png"}
            height={300}
            width={300}
            alt={name}
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="line-clamp-1">{name}</CardTitle>
          <CardDescription className="mt-2">
            <span className="font-semibold">
              {discountedPrice > 0 ? discountedPrice : price}{" "}
              <span className="text-green-500 font-semibold">PKR</span>
            </span>
            {discountedPrice > 0 && (
              <span className="text-sm text-zinc-600 line-through ml-2">
                {price}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter>
        <CartBtn id={id} price={price} discountedPrice={discountedPrice} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
