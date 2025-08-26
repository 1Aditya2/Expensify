import React from "react";

export function Input({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  disabled,
  autoComplete,
  className = '',
  inputClassName = "",
  labelClassName = "",
  onBlur,
  error,
}) {
  const inputId = id || name || "in-" + Math.random().toString(36).slice(2);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label} {required ? "*" : null}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
        autoComplete={autoComplete}
        className={`border border-black rounded-xl p-1 focus:outline-none focus:border-black ${inputClassName}`}
      />
      {error ? <div role="alert" className="text-red-600 text-sm mt-1">{error}</div> : null}
    </div>
  );
}
