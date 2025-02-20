"use client";

import { useProductsRefetch } from "@/store/refetchStates";
import { Product } from "@prisma/client";
import axios from "axios";
import { useCallback, useEffect, useState, useTransition } from "react";

const useProducts = () => {
  const [loading, start] = useTransition();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("desc");
  const [limit, setLimit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);

  const { refetch, offRefetch } = useProductsRefetch();

  const fetchProducts = useCallback(async () => {
    const response = await axios.get(
      `/api/product?search=${search}&sort=${sort}&limit=${limit}&offset=${offset}`
    );

    if (response.status === 200) {
      setProducts(response.data.data);
      offRefetch();
    }
  }, [search, sort, limit, offset, offRefetch]);

  useEffect(() => {
    start(async () => fetchProducts());
  }, [refetch, fetchProducts]);

  return {
    loading,
    products,
    search,
    setSearch,
    sort,
    setSort,
    limit,
    setLimit,
    offset,
    setOffset,
    fetchProducts,
  };
};

export default useProducts;
