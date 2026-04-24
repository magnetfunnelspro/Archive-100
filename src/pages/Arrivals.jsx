import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Components
import Card from "../components/Card";

// Data
import mainData from "../data/mainData";

const Arrivals = () => {
  // Reverse data (latest first)
  const newArrivals = [...mainData].reverse();

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>New Arrivals | Archive 100</title>

        <meta
          name="description"
          content="Shop all new arrivals of Archive 100. Explore all new arrivals available at our site."
        />

        <meta property="og:title" content="New Arrivals" />
        <meta
          property="og:description"
          content="Shop all new arrivals of Archive 100."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

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
              to={`/product/${product.slug}`}
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
