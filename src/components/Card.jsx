import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const discount = Math.round(
    ((data.originalPrice - data.price) / data.originalPrice) * 100,
  );

  return (
    <div className="w-full h-full flex flex-col gap-2 cursor-pointer">
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] rounded overflow-hidden">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h4 className="text-lg font-semibold line-clamp-1">{data.name}</h4>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-base font-semibold text-stone-900">
            ₹{data.price}
          </span>

          <span className="text-sm line-through text-stone-600">
            ₹{data.originalPrice}
          </span>

          <span className="text-sm font-semibold text-green-600">
            ({discount}% off)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
