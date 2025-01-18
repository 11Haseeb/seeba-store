"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useProducts from "@/hooks/use-products";
import ProductCard from "@/components/product-card/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { type CarouselApi } from "@/components/ui/carousel";

const RecentlyAdded = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  const { loading, products } = useProducts();

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem
                key={index + 1}
                className="basis-1/2 sm:basis-1/2 md:basis-1/3"
              >
                <Skeleton className="h-[300px]" />
              </CarouselItem>
            ))
          : products.map((product) => {
              return (
                <CarouselItem
                  key={product.name.toLowerCase().replace(" ", "-")}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/3"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              );
            })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RecentlyAdded;
