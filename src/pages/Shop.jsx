import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";

const Shop = () => {
  const [sort, setSort] = useState("default");
  const [filterStock, setFilterStock] = useState("all");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter
  let filteredProducts = [...mainData];

  if (filterStock === "inStock") {
    filteredProducts = filteredProducts.filter((p) => p.inStock);
  }

  if (filterStock === "outStock") {
    filteredProducts = filteredProducts.filter((p) => !p.inStock);
  }

  // Sort
  if (sort === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "newest") {
    filteredProducts.reverse(); // simple assumption
  }

  useEffect(() => {
    const handleClickOutside = () => setIsSortOpen(false);
    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Shop all products | Archive 100</title>

        <meta
          name="description"
          content="Shop all products of Archive 100. Premium oversized streetwear. Limited stock."
        />

        <meta property="og:title" content="Shop" />
        <meta
          property="og:description"
          content="All premium products of Archive 100."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Shop</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">All Products</h2>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStock("all")}
              className={`p-2 px-4 border rounded whitespace-nowrap ${
                filterStock === "all" ? "bg-purple-600 text-white" : ""
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilterStock("inStock")}
              className={`p-2 px-4 border rounded whitespace-nowrap ${
                filterStock === "inStock" ? "bg-purple-600 text-white" : ""
              }`}
            >
              In Stock
            </button>

            <button
              onClick={() => setFilterStock("outStock")}
              className={`p-2 px-4 border rounded whitespace-nowrap ${
                filterStock === "outStock" ? "bg-purple-600 text-white" : ""
              }`}
            >
              Out of Stock
            </button>
          </div>

          {/* Sort */}
          <div className="relative">
            {/* Icon Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSortOpen(!isSortOpen);
              }}
              className="p-2 px-4 border rounded hover:border-purple-600 transition"
            >
              <i className="ri-equalizer-2-line text-base"></i>
            </button>

            {/* Dropdown */}
            {isSortOpen && (
              <div className="w-40 mt-2 p-4 rounded flex flex-col gap-4 border absolute right-0 bg-white z-10">
                <button
                  onClick={() => {
                    setSort("default");
                    setIsSortOpen(false);
                  }}
                  className="w-full text-sm text-left hover:bg-purple-50"
                >
                  Default
                </button>

                <button
                  onClick={() => {
                    setSort("lowToHigh");
                    setIsSortOpen(false);
                  }}
                  className="w-full text-sm text-left hover:bg-purple-50"
                >
                  Price: Low → High
                </button>

                <button
                  onClick={() => {
                    setSort("highToLow");
                    setIsSortOpen(false);
                  }}
                  className="w-full text-sm text-left hover:bg-purple-50"
                >
                  Price: High → Low
                </button>

                <button
                  onClick={() => {
                    setSort("newest");
                    setIsSortOpen(false);
                  }}
                  className="w-full text-sm text-left hover:bg-purple-50"
                >
                  Newest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="pt-4 px-4 xl:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-stone-600">
            No products found
          </p>
        ) : (
          filteredProducts.map((data) => (
            <Link
              key={data.id}
              to={`/product/${data.slug}`}
              className="group flex flex-col gap-2"
            >
              <Card data={data} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
