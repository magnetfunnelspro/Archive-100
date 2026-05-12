import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Swiper
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Data
import faqData from "../data/faqData";
import mainData from "../data/mainData";

// Components
import Card from "../components/Card";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Bestsellers
  const bestsellers = [
    // Unspoken
    {
      name: "Unspoken Unisex Oversized Printed T-shirt",
      slug: "unspoken-unisex-oversized-printed-tshirt",
      price: 795,
      originalPrice: 1695,
      image: "/images/unspoken/image-1.webp",
      inStock: true,
    },

    // Ryujinnnn
    {
      name: "Ryujinnnn Unisex Oversized Printed T-shirt",
      slug: "ryujinnnn-unisex-oversized-printed-tshirt",
      price: 745,
      originalPrice: 1455,
      image: "/images/ryujinnnn/image-1.webp",
      inStock: true,
    },

    // Not Rude
    {
      name: "Not Rude Unisex Oversized Printed T-shirt",
      slug: "not-rude-unisex-oversized-printed-tshirt",
      price: 695,
      originalPrice: 1655,
      image: "/images/not-rude/image-1.webp",
      inStock: true,
    },

    // Dream
    {
      name: "Dream Unisex Oversized Printed T-shirt",
      slug: "dream-unisex-oversized-printed-tshirt",
      price: 695,
      originalPrice: 1255,
      image: "/images/dream/image-1.webp",
      inStock: true,
    },
  ];

  // Reverse data (latest first)
  const newArrivals = [...mainData].reverse();

  return (
    <div className="w-full h-full flex flex-col gap-8 text-stone-800 bg-white font-['Space_Grotesk']">
      {/* Promotional Text */}
      <h4 className="p-2.5 px-0 font-semibold text-center text-white bg-purple-600">
        Free shipping on all order above @ ₹1195
      </h4>

      {/* Promotional Banner */}
      <div className="px-4 xl:px-16">
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            1280: {
              spaceBetween: 32,
              slidesPerView: 1.75,
            },
          }}
          className="w-full"
        >
          <SwiperSlide>
            <Link to="/product/unspoken-unisex-oversized-printed-tshirt">
              <img
                loading="lazy"
                src="/poster/image-1.webp"
                alt="Promotional Banner"
                className="w-full aspect-video rounded"
              ></img>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/product/not-rude-unisex-oversized-printed-tshirt">
              <img
                loading="lazy"
                src="/poster/image-2.webp"
                alt="Promotional Banner"
                className="w-full aspect-video rounded"
              ></img>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/product/ryujinnnn-unisex-oversized-printed-tshirt">
              <img
                loading="lazy"
                src="/poster/image-3.webp"
                alt="Promotional Banner"
                className="w-full aspect-video rounded"
              ></img>
            </Link>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Trending */}
      <div className="px-4 xl:px-16 xl:pt-8 flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none">
          Trending Now
        </h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="w-full"
        >
          {bestsellers.map((data, index) => (
            <SwiperSlide>
              <Link key={index} to={`/product/${data.slug}`}>
                <Card data={data} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* New Arrivals */}
      <div className="px-4 xl:px-16 xl:pt-8 flex flex-col gap-4 xl:gap-8">
        <h2 className="text-2xl xl:text-4xl font-semibold leading-none">
          New Arrivals
        </h2>
        <Swiper
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              spaceBetween: 32,
            },
          }}
          className="w-full"
        >
          {newArrivals.map((data) => (
            <SwiperSlide>
              <Link key={data.id} to={`/product/${data.slug}`}>
                <Card data={data} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
