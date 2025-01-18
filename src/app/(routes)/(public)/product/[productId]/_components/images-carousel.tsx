import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { type CarouselApi } from "@/components/ui/carousel";

interface Props {
  loading: boolean;
  product: Product;
}

const ImagesCarousel = ({ loading, product }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return loading ? (
    <Skeleton className="h-[400px]" />
  ) : (
    <div className="border rounded-lg">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          <CarouselItem className="grid place-items-center">
            <Image
              src={product?.mainImage || "/product.png"}
              height={100}
              width={400}
              alt={product?.name || "Product"}
            />
          </CarouselItem>
          {product?.optionalImages.map((image) => {
            return (
              <CarouselItem key={image} className="grid place-items-center">
                <Image
                  src={image || "/product.png"}
                  height={100}
                  width={400}
                  alt={product?.name || "Product"}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-2xl text-center font-semibold py-2 border-t">
        {current} of {count}
      </p>
    </div>
  );
};

export default ImagesCarousel;
