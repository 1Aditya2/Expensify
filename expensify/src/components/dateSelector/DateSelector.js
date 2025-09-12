import React from "react";

export function DateSelector({
  id,
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  disabled = false,
  placeholder,
  name,
  className = '',
  inputClassName = '',
  labelClassName = '',
  error,
  onBlur
}) {
  const inputId = id || name || "date-" + Math.random().toString(36).slice(2);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label} {required ? "*" : null}
          {placeholder ? <span className="opacity-60"> ({placeholder})</span> : null}
        </label>
      )}
      <input
        type="date"
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={`border border-black rounded-xl p-1 focus:outline-none focus:border-black ${inputClassName}`}
      />
      {error ? <div role="alert" className="text-red-600 text-sm mt-1">{error}</div> : null}
    </div>
  );
}
