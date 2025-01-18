import { ArrowLeft, BookCheckIcon, ShoppingBag } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

const CartFooter = () => {
  const buttons = [
    { label: "Continue Shopping", url: "products", icon: <ArrowLeft /> },
    { label: "View Cart", url: "cart", icon: <ShoppingBag /> },
    { label: "Checkout", url: "checkout", icon: <BookCheckIcon /> },
  ];

  return (
    <div className="mt-4 space-y-2">
      {buttons.map(({ label, url, icon: Icon }) => {
        const name = label.toLowerCase().replace(" ", "-");

        return (
          <Button
            className="w-full"
            key={name}
            variant={name === "checkout" ? "default" : "outline"}
            asChild
          >
            <a href={`/${url}`}>
              {Icon} {label}
            </a>
          </Button>
        );
      })}
    </div>
  );
};

export default CartFooter;
