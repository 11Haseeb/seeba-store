import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-50">
      <div className="px-4 py-24 grid place-items-center">
        <div className="grid place-items-center gap-2">
          <h2 className="text-4xl font-bold">Welcome to our store</h2>
          <p className="text-lg text-muted-foreground">
            We offer a wide range of products for you to choose from
          </p>
          <Button
            className="bg-green-500 hover:bg-green-600 ring-2 ring-green-500 ring-offset-2 hover:ring-offset-0 hover:ring-green-600"
            asChild
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
