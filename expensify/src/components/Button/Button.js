import { Loader } from "lucide-react";
import React from "react";

export function Button({ primary = false, children, onClick, type = "button", disabled = false, className = "", loading = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={
        `px-4 py-2 flex items-center gap-2 rounded-lg
        ${primary ? 'bg-black text-white' : 'border border-black text-black'}
        ${(disabled || loading) ? 'opacity-50 cursor-none': ''}
        ${className}`
      }
    >
      {!loading && children}
      {loading && (
          <Loader size={16} className="animate-spin" />
      )}
    </button>
  );
}
