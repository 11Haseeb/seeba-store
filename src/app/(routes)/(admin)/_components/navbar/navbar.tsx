import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Logo from "@/components/logo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="shadow">
      <div className="p-2 flex justify-between items-center">
        <Logo />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
