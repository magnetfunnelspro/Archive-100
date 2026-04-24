import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Thanks = () => {
  return (
    <div className="w-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Thanks | Archive 100</title>

        <meta name="description" content="Yahoo! You have order the cloth." />

        <meta property="og:title" content="Thanks" />
        <meta
          property="og:description"
          content="Yahoo! You have order the cloth."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Order Confirmed</span>
      </div>

      {/* Thanks */}
      <div className="px-4 xl:px-16 flex flex-col items-center justify-center text-center gap-6">
        {/* Success Icon */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-50">
          <i className="ri-check-line text-4xl text-purple-600"></i>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Order Placed</h1>
          <p className="text-stone-600 max-w-xl">
            Thank you for your purchase. Your order has been received and is now
            being processed.
          </p>
        </div>

        {/* Process Steps */}
        <div className="w-full max-w-2xl mt-4 flex flex-col gap-4 text-left">
          <div className="p-4 rounded bg-purple-50 flex gap-4">
            <i className="ri-phone-line text-2xl text-purple-600"></i>
            <p className="text-sm text-stone-700">
              <span className="font-semibold">Step 1:</span> We will verify your
              order details by calling you shortly.
            </p>
          </div>

          <div className="p-4 rounded bg-purple-50 flex gap-4">
            <i className="ri-box-3-line text-2xl text-purple-600"></i>
            <p className="text-sm text-stone-700">
              <span className="font-semibold">Step 2:</span> After verification,
              your order will be processed and packed.
            </p>
          </div>

          <div className="p-4 rounded bg-purple-50 flex gap-4">
            <i className="ri-truck-line text-2xl text-purple-600"></i>
            <p className="text-sm text-stone-700">
              <span className="font-semibold">Step 3:</span> Within{" "}
              <span className="font-semibold">5 - 7 business days</span>, your
              package will be dispatched and delivered to you.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            to="/"
            className="w-full p-4 rounded text-center font-semibold text-white bg-purple-600"
          >
            Return to Home
          </Link>

          <Link
            to="/contact"
            className="w-full p-4 rounded text-center font-semibold border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white"
          >
            Contact Us
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-stone-500 mt-4">
          Need help? Our support team is always here for you.
        </p>
      </div>
    </div>
  );
};

export default Thanks;
