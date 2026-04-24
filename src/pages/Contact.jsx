import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Send to Telegram
  const sendToTelegram = async () => {
    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_CONTACT_CHAT_ID;

    const message = `
📩 New Contact Message

👤 Name: ${form.name}
📧 Email: ${form.email}

💬 Message:
${form.message}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await sendToTelegram();
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Contact us | Archive 100</title>

        <meta
          name="description"
          content={`Contact us via email or message. We usually reply within 24 hours.`}
        />

        <meta property="og:title" content="Contact" />
        <meta
          property="og:description"
          content="Contact us via email or message."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Contact</span>
      </div>

      {/* Header */}
      <div className="px-4 xl:px-16 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-sm text-stone-600">
          Have questions or need help? Reach out to us anytime.
        </p>
      </div>

      <div className="px-4 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Info */}
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded bg-purple-50 flex items-center gap-4">
            <i className="ri-mail-line text-2xl text-purple-600"></i>
            <div>
              <p className="text-sm text-stone-600">Email us at</p>
              <a
                href="mailto:support@archive100.shop"
                className="font-semibold text-purple-600"
              >
                support@archive100.shop
              </a>
            </div>
          </div>

          <div className="p-4 rounded bg-purple-50 flex items-center gap-4">
            <i className="ri-time-line text-2xl text-purple-600"></i>
            <p className="text-sm text-stone-600">
              We usually respond within 24 hours.
            </p>
          </div>
        </div>

        {/* RIGHT: Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-4 border rounded outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-4 border rounded outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-4 border rounded outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="p-4 rounded text-white bg-purple-600 font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-sm text-green-600">Message sent successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
