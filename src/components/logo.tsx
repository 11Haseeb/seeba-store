import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <h1
      className={cn(
        "text-3xl md:text-4xl font-semibold font-serif tracking-tighter",
        className
      )}
    >
      <Link href="/" className="flex items-center">
        <Image className="max-[390px]:hidden" src="/logo.png" width={50} height={50} alt="Logo" />
        <span className="text-green-500">Seeba</span>
        <span className="text-gray-800">Store</span>
      </Link>
    </h1>
  );
};

export default Logo;
