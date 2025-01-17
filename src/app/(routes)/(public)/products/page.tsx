"use client";

import React from "react";
import useProducts from "@/hooks/use-products";
import SearchBar from "@/components/search-bar";
import ProductsSortDropdown from "@/components/products-sort-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card/product-card";

const Products = () => {
  const { loading, products, search, setSearch, setSort, fetchProducts } =
    useProducts();

  return (
    <section>
      <div className="px-2 md:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <SearchBar
            search={search}
            setSearch={setSearch}
            fetchProducts={fetchProducts}
          />
          <ProductsSortDropdown setSort={setSort} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => {
                return <Skeleton key={index + 1} className="h-[350px]" />;
              })
            : products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default Products;
