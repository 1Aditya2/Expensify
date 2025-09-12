import React from "react";

export function LinearProgress({
  value,                
  label,                
  className = "",      
  trackClassName = "", 
  barClassName = "",   
  showValue = false,
  min = 0,
  max = 100,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
}) {
  const isIndeterminate = value == null;
  const pct = isIndeterminate
    ? 0
    : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className={className}>
      {label ? (
        <div className="mb-1 flex items-center justify-between">
          <span id={ariaLabelledby} className="text-sm font-medium text-gray-800">
            {label}
          </span>
          {showValue && !isIndeterminate ? (
            <span className="text-xs text-gray-600" aria-hidden="true">
              {Math.round(pct)}%
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        role="progressbar"
        aria-valuemin={isIndeterminate ? undefined : min}
        aria-valuemax={isIndeterminate ? undefined : max}
        aria-valuenow={isIndeterminate ? undefined : Math.round((pct / 100) * (max - min) + min)}
        aria-label={label ? undefined : ariaLabel}
        aria-labelledby={label ? ariaLabelledby : undefined}
        aria-describedby={ariaDescribedby}
        className={`relative h-3 w-full overflow-hidden ${trackClassName || "bg-gray-200"}`}
      >
        <div
          className={`h-full ${barClassName || "bg-black"} ${
            isIndeterminate ? "animate-[indeterminate_1.2s_infinite]" : ""
          }`}
          style={isIndeterminate ? undefined : { width: `${pct}%` }}
        />
      </div>
      <style jsx>{`
        @keyframes indeterminate {
          0%   { transform: translateX(-100%); width: 40%; }
          50%  { transform: translateX(20%);  width: 60%; }
          100% { transform: translateX(100%); width: 40%; }
        }
        .animate-[indeterminate_1.2s_infinite] {
          animation: indeterminate 1.2s ease-in-out infinite;
          will-change: transform, width;
        }
      `}</style>
    </div>
  );
};

