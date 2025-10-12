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
  multiple = false,
  className = '',
  selectClassName = '',
  labelClassName = '',
  onBlur,
  error
}) {
  const selectId = id || name || "select-" + Math.random().toString(36).slice(2);

  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const toggleValue = (v) => {
    const curr = Array.isArray(value) ? value : [];
    const next = curr.includes(v) ? curr.filter(x => x !== v) : [...curr, v];
    onChange({ target: { name, value: next } });
  };

  const selectAll = () => {
    const value = (options || []).filter(o => !o.disabled).map(o => o.value);
    onChange({ target: { name, value } });
  };

  const clearAll = () => {
    onChange({ target: { name, value: [] } });
  };

  if (!multiple) {
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
          className={`border border-black p-1 rounded-xl focus:outline-none focus:border-black focus:ring-0 dark:text-black ${selectClassName}`}
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
  }

  const selectedArray = Array.isArray(value) ? value : [];
  const selectedLabels = (options || [])
    .filter(o => selectedArray.includes(o.value))
    .map(o => o.label);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className={labelClassName}>
          {label} {required ? "*" : null}
        </label>
      )}

      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen(o => !o)}
        className={`border border-black p-2 rounded-xl text-left flex justify-between items-center ${selectClassName} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : (placeholder || "Select...")}
        </span>
        <svg className="h-4 w-4 ml-2 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          aria-multiselectable="true"
          className="mt-1 max-h-64 overflow-auto border border-black rounded-xl bg-white shadow-lg p-2 z-50"
        >
          <div className="flex items-center justify-between dark:text-black px-1 pb-2 gap-2">
            <button type="button" className="text-xs underline" onClick={selectAll}>
              Select all
            </button>
            <button type="button" className="text-xs underline" onClick={clearAll}>
              Clear
            </button>
          </div>

          {(options || []).map(opt => {
            const checked = selectedArray.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2 px-2 py-1 dark:text-black rounded cursor-pointer ${opt.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
                aria-selected={checked}
              >
                <input
                  type="checkbox"
                  disabled={opt.disabled}
                  checked={checked}
                  onChange={() => toggleValue(opt.value)}
                  className="h-4 w-4"
                />
                <span className="truncate">{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {error ? <div role="alert" className="text-red-600 text-sm mt-1">{error}</div> : null}
    </div>
  );
}
