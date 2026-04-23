import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Card from "../../components/Card";

// Data
import mainData from "../../data/mainData";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const fullProducts = savedWishlist
        .map((item) => mainData.find((product) => product.id === item.id))
        .filter(Boolean);

      setWishlist(fullProducts);
    };

    loadWishlist();

    window.addEventListener("storage", loadWishlist);
    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Wishlist</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Your Wishlist</h2>
        <p className="text-sm text-stone-600">
          Save your favorite products here
        </p>
      </div>

      {/* Grid */}
      <div className="pt-4 px-4 xl:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 text-center">
            <i className="ri-poker-hearts-line text-4xl text-stone-400"></i>
            <p className="text-stone-600">Your wishlist is empty</p>

            <Link
              to="/shop"
              className="p-4 px-6 rounded font-semibold text-white bg-purple-600"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          wishlist.map((product) => (
            <div key={product.id} className="relative group">
              <Link
                to={`/product/${product.id}`}
                className="flex flex-col gap-2"
              >
                <Card data={product} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
