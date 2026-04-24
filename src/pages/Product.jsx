import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";

// Data
import mainData from "../data/mainData";

const Product = () => {
  const { slug } = useParams();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]); // Track cart state for UI updates
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  // Size Guide Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Fetch product from data
  const product = mainData.find((p) => p.slug === slug);

  if (!product) return <div>Product not found</div>;

  // Load wishlist and cart from localStorage on mount
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setWishlist(savedWishlist);
    setCart(savedCart);
  }, []);

  // Discount calculator
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  // Expected Shipping
  const expectedShipping = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const formattedDate = expectedShipping.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  // Add to Cart
  const addToCart = () => {
    const savedData = JSON.parse(localStorage.getItem("cartData")) || {
      items: [],
      coupon: "",
      discount: 0,
    };

    const currentCart = savedData.items;

    const exists = currentCart.find(
      (item) => item.id === product.id && item.size === selectedSize,
    );

    if (!exists) {
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
      });
    }

    const updatedData = {
      ...savedData,
      items: currentCart,
    };

    localStorage.setItem("cartData", JSON.stringify(updatedData));

    setCart(currentCart);
    setIsCartOpen(true);
  };

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

  // WISHLIST TOGGLE
  const toggleWishlist = () => {
    let updatedWishlist = [...wishlist];
    const exists = updatedWishlist.find((item) => item.id === product.id);

    if (exists) {
      updatedWishlist = updatedWishlist.filter(
        (item) => item.id !== product.id,
      );
    } else {
      updatedWishlist.push({
        id: product.id,
      });
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // Derived states to determine UI conditions
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isAddedToCart = cart.some(
    (item) => item.id === product.id && item.size === selectedSize,
  );

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      <Helmet>
        <title>{product.name} | Archive 100</title>

        <meta
          name="description"
          content={`Buy ${product.name} at Archive 100. Premium oversized streetwear. Limited stock.`}
        />

        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.name} />
        <meta property="og:image" content={product.images[0]} />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "Archive 100",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: product.price,
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            },
          })}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="p-4 pb-0 xl:px-16 text-sm text-stone-600">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <Link to="/shop" className="hover:text-purple-600">
          Shop
        </Link>
        <i className="ri-arrow-right-s-line mx-2"></i>
        <span className="font-semibold">{product.name}</span>
      </div>

      {/* DETAILS */}
      <div className="px-4 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
        {/* LEFT: SWIPER GALLERY */}
        <div className="flex flex-col xl:flex-row-reverse gap-2 xl:gap-4">
          {/* Main Swiper */}
          <Swiper spaceBetween={16} className="w-full h-full">
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={product.name}
                  className="w-full h-full rounded object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails Swiper */}
          <div className="w-full xl:w-1/4 grid grid-cols-4 xl:grid-cols-1 gap-2 xl:gap-4">
            {product.images.map((img, index) => (
              <div key={index} className="cursor-pointer">
                <div className="w-full h-full">
                  <img
                    src={img}
                    alt="thumb"
                    className="w-full h-full rounded object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT CONTENT */}
        <div className="flex flex-col gap-4">
          {/* Stock */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold leading-tight">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}
              >
                {product.inStock ? "In Stock & Ready to Ship" : "Stock Out"}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-bold">₹{product.price}</span>
            <span className="text-lg line-through text-stone-600">
              ₹{product.originalPrice}
            </span>
            <span className="p-2 px-4 rounded text-xs font-bold uppercase text-purple-600 bg-purple-50">
              Save {discount}%
            </span>
          </div>

          <hr />

          {/* Size */}
          <div className="flex flex-col gap-4">
            {/* Size Guide */}
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold uppercase tracking-widest">
                Select Size
              </p>

              {/* Added onClick to open modal */}
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-sm font-semibold flex items-center gap-2 text-purple-600 hover:text-purple-700 transition"
              >
                <i className="ri-ruler-2-line"></i> Size Guide
              </button>
            </div>
            {/* Size Selector */}
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-2.5 px-4 rounded font-semibold border-2 transition-all duration-200 ${
                    selectedSize === size
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "text-stone-600 hover:border-stone-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex gap-4">
            {product.inStock ? (
              isAddedToCart ? (
                <Link
                  to="/cart"
                  className="w-full p-4 rounded text-lg font-semibold text-center text-white bg-purple-600"
                >
                  View in Cart
                </Link>
              ) : (
                <button
                  onClick={addToCart}
                  className="w-full p-4 rounded text-lg font-semibold text-white bg-purple-600"
                >
                  Add to Cart
                </button>
              )
            ) : (
              <button className="w-full p-4 rounded text-lg font-semibold text-white bg-red-600 cursor-not-allowed">
                Stock Out
              </button>
            )}

            <button
              onClick={toggleWishlist}
              className={`p-2.5 px-4 rounded text-lg border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white ${product.inStock ? "visible" : "hidden"}`}
            >
              <i
                className={`text-xl ${isWishlisted ? "ri-poker-hearts-fill" : "ri-poker-hearts-line"}`}
              ></i>
            </button>
          </div>

          {/* Info Accents */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Material */}
            <div className="p-4 rounded-sm flex items-center gap-4 bg-purple-50">
              <i className="ri-t-shirt-2-line text-2xl text-purple-600"></i>
              <div>
                <p className="text-xs font-semibold">Material</p>
                <p className="text-sm text-stone-600">{product.material}</p>
              </div>
            </div>
            {/* GSM */}
            <div className="p-4 rounded-sm flex items-center gap-4 bg-purple-50">
              <i className="ri-t-shirt-air-line text-2xl text-purple-600"></i>
              <div>
                <p className="text-xs font-semibold">Fabric</p>
                <p className="text-sm text-stone-600">
                  {product.gsm} {product.fit}
                </p>
              </div>
            </div>
            {/* Shipping Date */}
            <div className="p-4 rounded-sm flex items-center gap-4 bg-purple-50">
              <i className="ri-truck-line text-2xl text-purple-600"></i>
              <div>
                <p className="text-xs font-bold text-stone-800">Shipping</p>
                <p className="text-sm text-stone-600">
                  Expected delivery by{" "}
                  <span className="font-semibold">{formattedDate}</span>
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="pt-12 px-0 flex flex-col gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-4 text-purple-600">
              <i className="ri-quill-pen-line"></i>
              <span className="">Storyline</span>
            </h2>
            <p className="pl-4 border-l-4 border-stone-200 text-stone-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* SIZE GUIDE MODAL OVERLAY */}
      {isSizeGuideOpen && (
        <div className="p-4 sm:p-8 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-stone-800/80">
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl rounded flex flex-col animate-fade-in bg-white">
            {/* Header / Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-stone-200">
              <h4 className="text-xl font-bold">Size Guide</h4>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                aria-label="Close size guide"
              >
                <i className="ri-close-line text-2xl leading-none"></i>
              </button>
            </div>

            {/* Image Content */}
            <div className="max-h-[80vh] p-4 flex justify-center bg-purple-50">
              <img
                src="/Size.png"
                alt="Product Size Guide"
                className="max-w-full h-auto rounded object-contain"
              />
            </div>

            {/* Downloadable Image */}
            <div className="p-4 flex flex-col items-center">
              <a
                href="/Size.png"
                className="p-2.5 px-4 rounded font-semibold flex gap-2 text-white bg-purple-600"
                download
              >
                <i class="ri-download-line"></i>
                <span>Size Guide</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition ${
          isCartOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsCartOpen(false)}
          className={`absolute inset-0 bg-stone-800/50 backdrop-blur-sm transition-opacity ${
            isCartOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white transform transition-transform duration-200 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold leading-none">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)}>
              <i className="ri-close-line text-2xl leading-none"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col gap-4 p-4 overflow-auto">
            {cart.length === 0 ? (
              <p className="p-16 px-0 text-center text-stone-600">
                Your cart is empty
              </p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded object-cover"
                  />

                  <div className="flex flex-col">
                    <p className="font-semibold line-clamp-1">{item.name}</p>
                    <p className="text-sm text-stone-600">Size: {item.size}</p>
                    <p className="text-base font-semibold">₹{item.price}</p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-red-500"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="w-full p-4 border-t flex flex-col gap-4 absolute left-0 bottom-0">
            <p className="text-xs text-stone-600">
              Shipping & taxes calculated at checkout
            </p>

            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-stone-600">Subtotal</p>
              <p className="text-lg font-semibold">₹{subtotal}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                className="w-full block p-4 rounded text-center font-semibold text-white bg-purple-600"
              >
                Go to Cart
              </Link>
              <Link
                to="/shop"
                className="w-full block p-4 rounded text-center font-semibold border-2 border-r-4 border-b-4 border-purple-600 text-purple-600 bg-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
