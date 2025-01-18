"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Menu = ({ onClose }: { onClose: () => void }) => {
  const pathname = usePathname();
  const navLinks = ["Home", "Products", "Checkout"];

  return (
    <ul className="flex flex-col lg:flex-row gap-4 max-lg:px-4">
      {navLinks.map((navLink) => {
        const name = navLink.toLowerCase().replace(" ", "-");
        const link = name === "home" ? "/" : `/${name}`;

        return (
          <li key={name} onClick={onClose}>
            <Link
              href={link}
              className={`block ${
                pathname === link && "text-green-500 font-semibold"
              }`}
            >
              {navLink}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Menu;
