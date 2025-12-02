import React from "react";

/**
 * Props:
 * - id (string)
 * - min (number)
 * - max (number)
 * - step (number)
 * - value (number)
 * - onChange(value)
 * - label (string)
 * - showValue (bool) default true
 * - className (string)
 */
export default function Range({
  id,
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange,
  label,
  showValue = true,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-gray-200 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="w-full accent-[#49EB8C] cursor-pointer"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        {showValue && (
          <div className="text-sm text-gray-200 w-12 text-right tabular-nums">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}