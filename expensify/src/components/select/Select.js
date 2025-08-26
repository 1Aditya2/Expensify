import React from "react";

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  name,
  className = '',
  selectClassName = '',
  labelClassName = '',
  onBlur,
  error
}) {
  const selectId = id || name || "select-" + Math.random().toString(36).slice(2);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label htmlFor={selectId} className={labelClassName}>
          {label} {required ? "*" : null}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`border border-black p-1 rounded-xl focus:outline-none focus:border-black focus:ring-0 ${selectClassName}`}
      >
        {placeholder && (
          <option value="" disabled className="text-slate-400">
            {placeholder}
          </option>
        )}
        {(options || []).map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <div role="alert" className="text-red-600 text-sm mt-1">{error}</div> : null}
    </div>
  );
};
