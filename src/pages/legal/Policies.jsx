import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Policies = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Privacy Policy | Archive 100</title>

        <meta
          name="description"
          content="Read all our privacy policy beforing ordering from us to ensure your privacy."
        />

        <meta property="og:title" content="Privacy Policy" />
        <meta
          property="og:description"
          content="Read all our privacy policy beforing ordering from us to ensure your privacy."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Privacy Policy</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p className="text-sm text-stone-600">
          Your privacy is important to us. This policy explains how we collect
          and use your information.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 xl:px-16 flex flex-col gap-6 text-sm">
        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">1. Information We Collect</h2>
          <p>
            We collect personal information such as your name, phone number,
            email address, and shipping details when you place an order or
            contact us.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            Your information is used to process orders, deliver products,
            provide customer support, and improve our services.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">3. Payment Information</h2>
          <p>
            We do not store your payment details. All transactions are securely
            processed through trusted third-party payment providers.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">4. Sharing of Information</h2>
          <p>
            We do not sell or share your personal data with third parties,
            except when necessary for order fulfillment (such as shipping
            partners).
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">5. Data Security</h2>
          <p>
            We take appropriate measures to protect your personal data from
            unauthorized access, misuse, or disclosure.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">6. Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience and
            analyze site traffic.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">7. Your Rights</h2>
          <p>
            You have the right to access, update, or request deletion of your
            personal information by contacting us.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us at:
          </p>
          <a
            href="mailto:support@archive100.shop"
            className="text-purple-600 font-semibold"
          >
            support@archive100.shop
          </a>
        </div>
      </div>
    </div>
  );
};

export default Policies;
