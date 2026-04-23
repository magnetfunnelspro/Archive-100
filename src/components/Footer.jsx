import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t text-stone-800 bg-white font-['Space_Grotesk']">
      {/* Main Footer Links */}
      <div className="p-4 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Brand Info */}
        <div className="flex flex-col gap-2">
          <Link to="/" className="text-2xl font-semibold">
            Archive 100
          </Link>
          <p className="text-sm text-stone-600">
            Crafting premium streetwear with a focus on silhouette, material,
            and storytelling. Designed for the everyday visionary.
          </p>
        </div>

        {/* Column 2: Shop Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Shop</h4>
          <ul className="text-sm flex flex-col gap-2">
            <Link
              to="/shop"
              className="hover:text-purple-600 transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/shop/new"
              className="hover:text-purple-600 transition-colors"
            >
              New Arrivals
            </Link>
          </ul>
        </div>

        {/* Column 3: Support Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">Support</h4>
          <ul className="text-sm flex flex-col gap-2">
            <Link
              to="/contact"
              className="hover:text-purple-600 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/returns"
              className="hover:text-purple-600 transition-colors"
            >
              Return Policy
            </Link>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold">
            Contact
          </h4>
          <ul className="flex flex-col gap-4 text-sm">
            <li className="flex items-center gap-2">
              <i className="ri-mail-line text-xl leading-none text-purple-600"></i>
              <a
                href="mailto:support@archive100.shop"
                className="hover:text-purple-600 transition-colors"
              >
                support@archive100.shop
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="p-4 px-0 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-stone-600">
        <p className="text-sm">&copy; {new Date().getFullYear()} Archive 100. All rights reserved.</p>
        <div className="text-sm flex gap-4">
          <Link to="/privacy" className="hover:text-stone-800 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-stone-800 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
