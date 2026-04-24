import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Terns of Service | Archive 100</title>

        <meta
          name="description"
          content="Read all our terms of service before ordering from us."
        />

        <meta property="og:title" content="Terns of Service" />
        <meta
          property="og:description"
          content="Read all our terms of service before ordering from us."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Terms of Service</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p className="text-sm text-stone-600">
          These terms govern your use of our website and services. By using our
          site, you agree to these terms.
        </p>
      </div>

      {/* Content */}
      <div className="px-4 xl:px-16 flex flex-col gap-6 text-sm">
        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">1. Use of Website</h2>
          <p>
            By accessing our website, you agree to use it only for lawful
            purposes and in a way that does not infringe the rights of others.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">2. Product Information</h2>
          <p>
            We strive to display product details accurately. However, we do not
            guarantee that all information, including pricing and availability,
            is always error-free.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">3. Orders & Payments</h2>
          <p>
            All orders are subject to acceptance and availability. We reserve
            the right to cancel or refuse any order at our discretion.
          </p>
          <p>
            Payments are processed securely through third-party payment
            providers. We do not store your payment information.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">4. Shipping & Delivery</h2>
          <p>
            Orders are typically processed after verification and delivered
            within 5-7 business days. Delivery times may vary based on location
            and external factors.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">5. Returns & Refunds</h2>
          <p>
            Please refer to our refund policy for detailed information regarding
            returns, exchanges, and refunds.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">6. Intellectual Property</h2>
          <p>
            All content on this website, including images, designs, logos, and
            text, is the property of Archive 100 and may not be used without
            permission.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
          <p>
            We are not liable for any indirect or consequential damages arising
            from the use of our website or products.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these terms at any time
            without prior notice.
          </p>
        </div>

        {/* Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <a
            href="mailto:support@archive100.com"
            className="text-purple-600 font-semibold"
          >
            support@archive100.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
