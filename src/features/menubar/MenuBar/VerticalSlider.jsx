import React, { useRef, useCallback, memo } from "react";

export const VerticalSlider = memo(function VerticalSlider({ value, onChange, min = 0, max = 100 }) {
  const barRef = useRef(null);
  const isDragging = useRef(false);

  const updateValue = useCallback((clientX) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.min(1, Math.max(0, percent));
    const newValue = min + percent * (max - min);
    onChange?.(newValue);
  }, [min, max, onChange]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    updateValue(e.clientX);

    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current) return;
      updateValue(moveEvent.clientX);
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [updateValue]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="cc-slider-block">
      <div
        className="cc-slider-bar"
        ref={barRef}
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
      >
        <div className="cc-slider-fill" style={{ width: `${percent}%` }} />
        <div className="cc-slider-knob" style={{ left: `${percent}%` }} />
      </div>
    </div>
  );
});