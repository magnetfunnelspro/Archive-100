import React from "react";
import { Link } from "react-router-dom";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";

const Arrivals = () => {
  // 🔥 Reverse data (latest first)
  const newArrivals = [...mainData].reverse();

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">New Arrivals</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">New Arrivals</h2>
        <p className="text-sm text-stone-600">
          Discover the latest additions to our collection
        </p>
      </div>

      {/* Product Grid */}
      <div className="pt-4 px-4 xl:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {newArrivals.length === 0 ? (
          <p className="col-span-full text-center text-stone-600">
            No products found
          </p>
        ) : (
          newArrivals.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group flex flex-col gap-2"
            >
              <Card data={product} />
            </Link>
          ))
        )}

      </div>
    </div>
  );
};

export default Arrivals;