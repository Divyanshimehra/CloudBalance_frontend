import React, { useState } from "react";
// import Toast from "../../Toast/Toast";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Toast from "../../Toast";

export default function CopyableInput({ value }) {
  const [showToast, setShowToast] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="flex items-center gap-2.5">
      <IconButton
        onClick={copy}
        title="Copy"
        size="small"
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>

      <input className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 bg-slate-50 text-sm text-black" value={value} readOnly />

      {showToast && <Toast message="Copied" />}
    </div>
  );
}
