import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Load cart
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("cartData")) || {};

    setCart(savedData.items || []);
    setCoupon(savedData.coupon || "");
    setDiscount(savedData.discount || 0);

    if (savedData.coupon) {
      setAppliedCoupon(savedData.coupon);
    }
  }, []);

  // Remove item
  const removeItem = (id, size) => {
    const savedData = JSON.parse(localStorage.getItem("cartData")) || {
      items: [],
    };

    const updatedItems = savedData.items.filter(
      (item) => !(item.id === id && item.size === size),
    );

    const updatedData = {
      ...savedData,
      items: updatedItems,
    };

    // optional: reset coupon if cart empty
    if (updatedItems.length === 0) {
      updatedData.coupon = "";
      updatedData.discount = 0;
    }

    localStorage.setItem("cartData", JSON.stringify(updatedData));
    setCart(updatedItems);
  };

  // Subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  // Coupon Logic (simple but scalable)
  const applyCoupon = () => {
    let discountValue = 0;

    if (coupon.toUpperCase() === "SAVE300") {
      discountValue = 300;
    } else if (coupon.toUpperCase() === "SPIRIT400") {
      discountValue = 400;
    } else {
      setAppliedCoupon("invalid");
      return;
    }

    setDiscount(discountValue);
    setAppliedCoupon(coupon);

    const cartData = {
      items: cart,
      coupon: coupon,
      discount: discountValue,
    };

    localStorage.setItem("cartData", JSON.stringify(cartData));
  };

  const total = subtotal - discount;

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>Cart | Archive 100</title>

        <meta
          name="description"
          content="Explore the cart and move out to checkout page."
        />

        <meta property="og:title" content="Cart" />
        <meta
          property="og:description"
          content="Explore the cart and move out to checkout page."
        />
        <meta property="og:image" content="/Logo.png" />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">Cart</span>
      </div>

      {/* Cart */}
      <div className="px-4 xl:px-16 grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-16">
        {/* LEFT: CART ITEMS */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="p-12 text-center border rounded bg-purple-50">
              <p className="text-stone-600">Your cart is empty</p>
              <Link
                to="/shop"
                className="inline-block mt-4 p-4 px-6 rounded font-semibold text-white bg-purple-600"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="w-full flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded object-cover"
                />

                <div className="w-full flex justify-between gap-4">
                  <div className="flex flex-col">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-sm text-stone-600">Size: {item.size}</p>
                    <p className="text-base font-semibold">₹{item.price}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-600"
                  >
                    <i className="ri-delete-bin-line text-xl"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="border-t pt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">Order Summary</h4>

            {/* Subtotal */}
            <div className="mt-2 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹{Math.round(discount)}</span>
              </div>
            )}

            <hr className="m-2 mx-0" />

            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{Math.max(0, Math.round(total))}</span>
            </div>

            {/* Coupon */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 p-4 rounded border outline-none placeholder:capitalize uppercase"
                />
                <button
                  onClick={applyCoupon}
                  className="p-4 px-4 rounded font-semibold text-white bg-purple-600"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon === "invalid" && (
                <p className="text-xs text-red-500">Invalid coupon</p>
              )}

              {appliedCoupon && appliedCoupon !== "invalid" && (
                <p className="text-xs text-green-600">
                  Yahoo!{" "}
                  <span className="font-semibold">
                    {appliedCoupon.toUpperCase()}
                  </span>{" "}
                  code applied.
                </p>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/checkout"
              className="w-full block mt-2 p-4 rounded text-center font-semibold text-white bg-purple-600"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full block p-4 rounded text-center font-semibold border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Trust badge */}
          <div className="p-4 rounded flex items-center gap-4 bg-purple-50">
            <i className="ri-shield-check-line text-2xl text-purple-600"></i>
            <p className="text-sm text-stone-600">
              Secure checkout. 100% safe payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
