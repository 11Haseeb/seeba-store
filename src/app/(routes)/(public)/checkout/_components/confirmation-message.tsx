"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ConfirmationMessage = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-green-500 text-5xl mb-4">
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been successfully placed
          and is being processed.
        </p>
        <p className="text-gray-500 mb-6">
          You will receive an email confirmation with your order details
          shortly.
        </p>
        <Button className="bg-green-500 hover:bg-green-600" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
