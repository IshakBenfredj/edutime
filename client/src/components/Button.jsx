import React from "react";

export default function Button({ text, loadingText, loading, color }) {
  return (
    <button
      className={`py-1 px-3 w-fit md:text-base text-sm block mx-auto ${
        loading
          ? "bg-gray-500"
          : color === "danger"
          ? "bg-red-500"
          : color === "success"
          ? "bg-teal-600"
          : "bg-title"
      } rounded-lg font-bold text-lg text-white`}
    >
      {loading ? `${loadingText} ...` : text}
    </button>
  );
}
