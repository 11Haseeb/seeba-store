"use client";

import React, { useState } from "react";
import Logo from "@/components/logo";
import Menu from "./menu";
import DashboardBtn from "./dashboard-btn";
import AuthBtns from "@/components/auth-btns";
import Cart from "@/components/cart/cart";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react"; // Import icons
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 shadow z-50">
      <div className="sm:px-0 py-4 md:px-2 lg:px-4 flex justify-between items-center">
        <Logo />

        <div className="flex gap-0 sm:gap-2 md:gap-4 lg:gap-6">
          {/* Large Screen Menu */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-12">
            <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-12">
              <Menu onClose={() => setMenuOpen(false)} />
              <DashboardBtn />
            </div>
            <div className="flex items-center gap-2">
              <Cart />
              <AuthBtns />
            </div>
          </div>

          {/* Hamburger menu for smaller screens */}
          <button
            className="lg:hidden text-2xl md:text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md absolute top-23 left-0 w-full z-40">
          <Menu onClose={() => setMenuOpen(false)} />
          <div className="p-4 flex flex-col">
            <DashboardBtn />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
