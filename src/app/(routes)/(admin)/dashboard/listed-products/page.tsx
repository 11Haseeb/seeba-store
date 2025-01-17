"use client";

import React from "react";
import SearchBar from "@/components/search-bar";
import ProductsSortDropdown from "@/components/products-sort-dropdown";
import useProducts from "@/hooks/use-products";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRow from "./_components/product-row";
import { Skeleton } from "@/components/ui/skeleton";

const ListedProducts = () => {
  const { loading, products, search, setSearch, setSort } = useProducts();

  return (
    <section>
      <div>
        <div className="mb-8 flex max-sm:flex-wrap justify-between items-center">
          <SearchBar search={search} setSearch={setSearch} />
          <ProductsSortDropdown setSort={setSort} />
        </div>

        <Table>
          <TableCaption>List of your products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <TableRow key={index + 1}>
                      <TableCell colSpan={6}>
                        <Skeleton key={index + 1} className="h-[80px]" />
                      </TableCell>
                    </TableRow>
                  );
                })
              : products.map((product) => {
                  return (
                    <ProductRow
                      key={product.name.toLowerCase().replace(" ", "-")}
                      product={product}
                    />
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default ListedProducts;
