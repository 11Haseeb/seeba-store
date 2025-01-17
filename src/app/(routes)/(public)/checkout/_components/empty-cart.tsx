"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-red-500 text-5xl mb-4">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Your Cart is Empty!
        </h2>
        <p className="text-gray-600 mb-6">
          It looks like you haven't added any items to your cart yet.
        </p>
        <p className="text-gray-500 mb-6">
          Explore our catalog to find the products you love.
        </p>
        <Button className="bg-green-600 hover:bg-green-700" asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCart;
