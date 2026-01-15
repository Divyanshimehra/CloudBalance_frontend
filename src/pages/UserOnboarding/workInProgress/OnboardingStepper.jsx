import React from "react";

export default function OnboardingStepper({ steps, currentIndex }) {
  return (
    <div className="bg-white border-b border-gray-200 px-7 h-[50px] flex gap-4 items-center overflow-x-auto sticky top-0 z-[30]">
      {steps.map((s, idx) => {
        const isActive = idx === currentIndex;
        const isDone = idx < currentIndex;

        return (
          <div key={s.letter} className={`flex items-center gap-2 whitespace-nowrap h-full ${isActive ? "active" : ""}`}>
            <div
              className={`w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center text-[10px] text-white ${isActive ? "active" : ""} ${
                isDone ? "done" : ""
              }`}
            >
              {isDone ? "✓" : ""}
            </div>

            <div
              className={`text-[13px] text-gray-900 ${isActive ? "active" : ""}`}
            >
              {s.letter}. {s.label}
            </div>

            {idx < steps.length - 1 && <div className="w-7 h-0.5 bg-gray-200 mx-2" />}
          </div>
        );
      })}
    </div>
  );
}
