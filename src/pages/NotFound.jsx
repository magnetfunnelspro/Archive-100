import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/shop");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">404</span>
      </div>

      {/* Main */}
      <div className="px-4 xl:px-16 flex flex-col items-center justify-center text-center gap-6 flex-1">
        {/* Icon */}
        <div className="p-4 flex items-center justify-center rounded-full bg-purple-50">
          <i className="ri-error-warning-line text-5xl text-purple-600"></i>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Page Not Found</h1>
          <p className="text-stone-600 max-w-md">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-md">
          <Link
            to="/"
            className="w-full p-4 rounded font-semibold text-white bg-purple-600 text-center"
          >
            Return to Home
          </Link>

          <Link
            to="/"
            className="w-full p-4 rounded font-semibold border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white text-center"
          >
            Continute Shopping
          </Link>
        </div>

        {/* Extra Help */}
        <p className="text-xs text-stone-600 mt-2">
          If you think this is a mistake, feel free to contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
