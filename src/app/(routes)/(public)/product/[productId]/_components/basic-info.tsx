import React from "react";
import { Product as ProductType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import QuantityBtn from "@/components/quantity-btn";
import { Skeleton } from "@/components/ui/skeleton";

const BasicInfo = ({
  loading,
  product,
}: {
  loading: boolean;
  product: ProductType;
}) => {
  return loading ? (
    <Skeleton className="h-[400px]" />
  ) : (
    <div className="p-4 pt-12 relative border rounded-lg">
      {product?.discountPercentage > 0 && (
        <Badge className="text-sm text-zinc-100 bg-red-500 hover:bg-red-500 absolute top-2 left-2">
          {product?.discountPercentage} % OFF
        </Badge>
      )}
      <h2 className="text-3xl font-semibold mb-2">
        <span className="font-bold">Name:</span> {product?.name}
      </h2>
      <h3 className="mb-8">
        <span className="text-2xl font-bold">Price:</span>
        <span className="font-semibold ml-2">
          {product?.discountedPrice > 0
            ? product?.discountedPrice
            : product?.price}{" "}
          <span className="text-green-500 font-semibold">PKR</span>
        </span>
        {product?.discountedPrice > 0 && (
          <span className="text-sm text-zinc-600 line-through ml-2">
            {product?.price}
          </span>
        )}
      </h3>
      <QuantityBtn product={product} />
    </div>
  );
};

export default BasicInfo;
