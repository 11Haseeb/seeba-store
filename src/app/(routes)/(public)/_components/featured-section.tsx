"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useProducts from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card/product-card";

const FeaturedSection = () => {
  const { loading, products } = useProducts();

  return (
    <section>
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center text-center">
          <h2 className="text-3xl font-semibold">Featured</h2>
          <Button className="rounded-none" asChild>
            <Link href="/products">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => {
                return <Skeleton key={index + 1} className="h-[350px]" />;
              })
            : products.map((product) => {
                return (
                  <ProductCard
                    key={product.name.toLowerCase().replace(" ", "-")}
                    product={product}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
