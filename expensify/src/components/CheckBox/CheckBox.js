import React from "react";

export function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  className,
  inputClassName = "h-4 w-4 accent-black cursor-pointer",
  labelClassName = "ml-2 select-none",
  description,
}) {
  const inputId = id || name || "chk-" + Math.random().toString(36).slice(2);

  return (
    <div className={`flex items-center ${className}`}>
        {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
        </label>
      )}
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e)}
          disabled={disabled}
          className={inputClassName}
        />
      {description ? <div className="text-sm text-gray-600 mt-1">{description}</div> : null}
    </div>
  );
};
