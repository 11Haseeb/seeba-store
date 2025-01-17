"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Product as ProductType } from "@prisma/client";
import ImagesCarousel from "./_components/images-carousel";
import BasicInfo from "./_components/basic-info";
import Details from "./_components/details";
import RecentlyAdded from "./_components/recently-added";

const Product = () => {
  const { productId } = useParams();
  const [loading, start] = useTransition();
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    start(async () => {
      const response = await axios.get(`/api/product?id=${productId}`);

      if (response.status === 200) {
        setProduct(response.data.data);
      }
    });
  }, [productId]);

  return (
    <div className="px-2 md:px-6 lg:px-8 py-12 grid gap-8">
      <section>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-6">
          <ImagesCarousel loading={loading} product={product as ProductType} />
          <BasicInfo loading={loading} product={product as ProductType} />
        </div>
      </section>

      <section>
        <h3 className="text-4xl font-bold underline mb-6">Details</h3>
        <Details loading={loading} product={product as ProductType} />
      </section>

      {!loading && (
        <section>
          <h3 className="text-4xl text-center font-bold mt-4 mb-8">
            Recently Added
          </h3>
          <RecentlyAdded />
        </section>
      )}
    </div>
  );
};

export default Product;
