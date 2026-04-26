import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Data
import faqData from "../../data/faqData";

const FAQs = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>FAQs | Archive 100</title>

        <meta
          name="description"
          content="Find answers to common questions about orders, shipping, payments, and more."
        />

        <meta property="og:title" content="FAQs" />
        <meta
          property="og:description"
          content="Find answers to common questions about orders, shipping, payments, and more."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">FAQs</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <p className="text-sm text-stone-600">
          Find answers to the most common questions about orders, shipping,
          payments, and more.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 xl:px-16 flex flex-col gap-6 text-sm">
        {faqData.map((faq, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">
               {faq.question}
            </h2>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
