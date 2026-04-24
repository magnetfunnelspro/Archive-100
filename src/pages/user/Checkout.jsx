import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  // Load cart + coupon
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("cartData")) || {};

    setCart(savedData.items || []);
    setCoupon(savedData.coupon || "");
    setDiscount(savedData.discount || 0);
  }, []);

  // Pricing
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const shipping = 50;
  const codFee = paymentMethod === "cod" ? 50 : 0;

  const total = Math.max(0, subtotal - discount + shipping + codFee);

  // Handle form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch City/State from Pincode
  const fetchPincodeData = async (pincode) => {
    if (pincode.length !== 6) return;

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      const data = await res.json();

      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];

        setForm((prev) => ({
          ...prev,
          city: postOffice.District,
          state: postOffice.State,
        }));
      }
    } catch (err) {
      console.log("Pincode fetch failed");
    }
  };

  // Telegram Send
  const sendToTelegram = async () => {
    const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
    const CHAT_ID = import.meta.env.VITE_DATABASE_CHAT_ID;

    const message = `
🛒 New Order

👤 Name: ${form.name}
📞 Phone: ${form.phone}

📍 Address:
${form.address}
${form.city}, ${form.state} - ${form.pincode}

🧾 Items:
${cart.map((i) => `• ${i.name} (₹${i.price})`).join("\n")}

💰 Subtotal: ₹${subtotal}
🏷 Coupon: ${coupon || "None"}
💸 Discount: ₹${discount}
🚚 Shipping: ₹${shipping}
💵 COD Fee: ₹${codFee}

🧮 Total: ₹${total}

💳 Payment: ${paymentMethod.toUpperCase()}
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

  // Load Razorpay
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // Razorpay
  const handleRazorpay = async () => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Payment failed to load. Please try again.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RZP_LIVE_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "Archive 100",

      image: "/Logo.png",

      handler: async function () {
        await sendToTelegram();

        localStorage.removeItem("cartData");
        navigate("/thanks");
      },

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: { color: "#7c3aed" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Place Order
  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpay();
    } else {
      await sendToTelegram();
      localStorage.removeItem("cart");
      localStorage.removeItem("cartData");
      navigate("/thanks");
      localStorage.removeItem("cartData");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Checkout | Archive 100</title>

        <meta
          name="description"
          content="The last step of ordering your new fashion cloth."
        />

        <meta property="og:title" content="Checkout" />
        <meta
          property="og:description"
          content="The last step of ordering your new fashion cloth."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumb */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/">Home</Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Checkout</span>
      </div>

      {/* Checkout */}
      <div className="px-4 xl:px-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Shipping Details</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-4 border rounded outline-none capitalize"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="p-4 border rounded outline-none capitalize"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            className="p-4 border rounded outline-none resize-none"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            onChange={(e) => {
              handleChange(e);
              fetchPincodeData(e.target.value);
            }}
            className="p-4 border rounded outline-none capitalize"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              value={form.city}
              placeholder="City"
              readOnly
              className="p-4 border rounded outline-none capitalize bg-purple-50"
            />
            <input
              value={form.state}
              placeholder="State"
              readOnly
              className="p-4 border rounded outline-none capitalize bg-purple-50"
            />
          </div>

          {/* Payment */}
          <h2 className="mt-4 text-xl font-semibold">Payment Method</h2>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setPaymentMethod("razorpay")}
              className={`p-4 border rounded outline-none capitalize flex justify-between ${
                paymentMethod === "razorpay"
                  ? "border-purple-600 bg-purple-50"
                  : ""
              }`}
            >
              Pay Online (Razorpay)
            </button>

            <button
              onClick={() => setPaymentMethod("cod")}
              className={`p-4 border rounded outline-none capitalize flex justify-between ${
                paymentMethod === "cod" ? "border-purple-600 bg-purple-50" : ""
              }`}
            >
              <span>Cash on Delivery (COD)</span>
              <span>+50</span>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-t pt-4 flex flex-col gap-2">
          <h4 className="font-semibold text-lg">Order Summary</h4>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600 text-sm">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span>Shipping Cost</span>
            <span>₹{shipping}</span>
          </div>

          {paymentMethod === "cod" && (
            <div className="flex justify-between text-sm">
              <span>COD Fee</span>
              <span>₹50</span>
            </div>
          )}

          <hr className="m-2 mx-0" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="p-4 mt-2 rounded text-white bg-purple-600 font-semibold"
          >
            Place Order
          </button>

          <Link
            to="/cart"
            className="w-full block p-4 rounded text-center font-semibold border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white"
          >
            Return to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
