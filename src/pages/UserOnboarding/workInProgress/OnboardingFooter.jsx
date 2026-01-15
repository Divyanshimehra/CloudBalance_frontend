import React from "react";
import Button from '@mui/material/Button';

export default function OnboardingFooter({
  currentIndex,
  pageNames,
  onCancel,
  onBack,
  onNext,
  isNextEnabled,
}) {
  const prevName = currentIndex > 0 ? pageNames[currentIndex - 1] : "";
  const nextName =
    currentIndex < pageNames.length - 1 ? pageNames[currentIndex + 1] : "";

  const showBack = currentIndex > 0;

  const backLabel = `Back - ${prevName}`;
  const nextLabel =
    currentIndex === pageNames.length - 1 ? "Submit" : `Next - ${nextName}`;

  return (
    <div className="bg-[#f4f6f8] border-t border-gray-200 px-7 py-3.5 flex items-center justify-between sticky bottom-0 z-[100]">

      <div>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      
      <div className="flex gap-2.5">
        {showBack && (
          <Button variant="outlined" onClick={onBack}>
            {backLabel}
          </Button>
        )}

        <Button
          variant="contained"
          onClick={onNext}
          disabled={!isNextEnabled}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
