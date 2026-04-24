import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Components
import Card from "../../components/Card";

// Data
import mainData from "../../data/mainData";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = mainData.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );

    setResults(filtered);
  }, [query]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Search | Archive 100</title>

        <meta
          name="description"
          content="Search a product from our collection."
        />

        <meta property="og:title" content="Search" />
        <meta
          property="og:description"
          content="Search a product from our collection."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Search</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Search Products</h2>

        {/* Search Input */}
        <div className="flex items-center gap-4 border rounded p-4">
          <i className="ri-search-line text-lg text-stone-500"></i>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Result count */}
        {query && (
          <p className="text-sm text-stone-600">
            {results.length} result{results.length !== 1 && "s"} found
          </p>
        )}
      </div>

      {/* Results */}
      <div className="pt-4 px-4 xl:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!query ? (
          <div className="col-span-full text-center text-stone-500">
            <i className="ri-search-line text-3xl mb-2"></i>
            <p>Start typing to search products</p>
          </div>
        ) : results.length === 0 ? (
          <div className="col-span-full text-center text-stone-500">
            <i className="ri-error-warning-line text-3xl mb-2"></i>
            <p>No products found</p>
          </div>
        ) : (
          results.map((product) => (
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

export default Search;
