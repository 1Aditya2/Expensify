import React, { useState } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-10 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1 text-sm text-white shadow-lg ${positionClasses[position]}`}
        >
          {text}
          <div
            className={`absolute bg-gray-800 ${
              position === "top"
                ? "left-1/2 -translate-x-1/2 top-full"
                : position === "bottom"
                ? "left-1/2 -translate-x-1/2 bottom-full"
                : position === "left"
                ? "top-1/2 -translate-y-1/2 right-0"
                : "top-1/2 -translate-y-1/2 left-0"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
