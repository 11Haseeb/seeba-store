import React from "react";
import { Product as ProductType } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailsProps {
  loading: boolean;
  product: ProductType;
}

const Details = ({ loading, product }: DetailsProps) => {
  return loading ? (
    <Skeleton className="h-[400px]" />
  ) : (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
          <p className="text-gray-500 mt-2">{product?.description}</p>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Category: <span className="font-normal">{product?.category}</span>
          </p>
          {product?.brand && (
            <p className="text-lg font-semibold text-gray-700">
              Brand: <span className="font-normal">{product?.brand}</span>
            </p>
          )}
        </div>

        <div className="mt-6">
          {product?.discount > 0 ? (
            <div>
              <p className="text-xl font-bold text-red-600">
                ${product?.discountedPrice.toFixed(2)}
              </p>
              <p className="text-sm line-through text-gray-400">
                ${product?.price.toFixed(2)}
              </p>
              <p className="text-green-600 text-sm">
                Save {product?.discountPercentage}%!
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold text-gray-800">
              ${product?.price.toFixed(2)}
            </p>
          )}
        </div>

        <div className="mt-6">
          {product?.isAvailable ? (
            <p className="text-green-600 font-semibold">
              In Stock: {product?.stockQuantity}
            </p>
          ) : (
            <p className="text-red-600 font-semibold">Out of Stock</p>
          )}
        </div>

        {product?.message && (
          <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            <p>{product?.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
