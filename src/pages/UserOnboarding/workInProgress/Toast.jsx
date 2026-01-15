import React from "react";

export default function Toast({ message }) {
  return (
    <div className="fixed top-5 right-5 bg-gray-900 text-white px-3 py-2 rounded-lg text-[13px] font-bold z-[9999]">
      {message}
    </div>
  );
}
