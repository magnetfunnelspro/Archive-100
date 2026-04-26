import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const FAQsItem = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? contentRef.current.scrollHeight + "px"
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className="border rounded overflow-hidden transition-all duration-200">
      <button
        onClick={onClick}
        className="w-full p-4 flex justify-between items-center text-left font-semibold"
      >
        <span className="text-sm xl:text-base">{faq.question}</span>

        {/* Icon */}
        <span
          className={`text-sm transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <i className="ri-add-large-line"></i>
        </span>
      </button>

      {/* Animated Content */}
      <div
        ref={contentRef}
        className="max-h-0 overflow-hidden transition-all duration-200 ease-in-out"
      >
        <div className="px-4 pb-4 text-sm text-stone-600">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQsItem;
