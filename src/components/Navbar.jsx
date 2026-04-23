import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full p-4 px-0 border-b flex items-center justify-between text-stone-800 bg-white font-['Space_Grotesk']">
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-semibold">
        Archive 100
      </Link>

      {/* Navigation */}
      <div className="hidden xl:flex items-center gap-8">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/shop" className="hover:underline">
          Shop
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>

        {/* Search */}
        <Link to="/search">
          <i className="ri-search-line"></i>
        </Link>
        {/* Wishlist */}
        <Link to="/wishlist">
          <i className="ri-poker-hearts-line"></i>
        </Link>
        {/* Shopping Cart */}
        <Link to="/cart">
          <i className="ri-shopping-bag-line"></i>
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div className="text-xl flex xl:hidden items-center gap-4 relative">
        {/* Search */}
        <Link to="/search">
          <i className="ri-search-line"></i>
        </Link>
        {/* Wishlist */}
        <Link to="/wishlist">
          <i className="ri-poker-hearts-line"></i>
        </Link>
        {/* Shopping Cart */}
        <Link to="/cart">
          <i className="ri-shopping-bag-line"></i>
        </Link>
        {/* Menu */}
        <button onClick={() => setIsOpen(true)}>
          <i className="ri-menu-line"></i>
        </button>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[280px] bg-white transform transition-transform duration-200 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          {/* Logo */}
          <Link to="/" className="text-2xl font-semibold">
            Archive 100
          </Link>

          <button onClick={() => setIsOpen(false)}>
            <i className="ri-close-large-line text-xl"></i>
          </button>
        </div>

        {/* Links */}
        <div className="p-4 text-lg flex flex-col items-end gap-4">
          <Link onClick={() => setIsOpen(false)} to="/">
            Home
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/shop">
            Shop
          </Link>

          <Link onClick={() => setIsOpen(false)} to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
