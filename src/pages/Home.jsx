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
                src="/poster/image-1.png"
                alt="Promotional Banner"
                className="w-full aspect-video rounded"
              ></img>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/product/not-rude-unisex-oversized-printed-tshirt">
              <img
                loading="lazy"
                src="/poster/image-2.png"
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
          {mainData.map((data) => (
            <SwiperSlide>
              <Link key={data.id} to={`/product/${data.slug}`}>
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
