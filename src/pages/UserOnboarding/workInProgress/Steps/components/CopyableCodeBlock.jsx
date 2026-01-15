import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Toast from "../../Toast";
// import Toast from "../../Toast";

export default function CopyableCodeBlock({ value }) {
  const [showToast, setShowToast] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1200);
  };

  return (
    <div className="relative border border-gray-200 rounded-lg bg-slate-50 overflow-hidden">
      <IconButton
        onClick={copy}
        title="Copy"
        className="absolute right-5 !important"
        size="small"
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
      <pre className="max-h-[220px] overflow-auto p-3.5 m-0 text-xs leading-[1.45] text-slate-900 whitespace-pre">
        <code>{value}</code>
      </pre>
      {showToast && <Toast message="Copied" />}
    </div>
  );
}
