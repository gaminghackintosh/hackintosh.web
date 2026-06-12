import React, { useState, useEffect, useRef, useCallback, memo } from "react";

export const VerticalSlider = memo(function VerticalSlider({ initialValue = 50, icon: Icon, onValueChange }) {
  const trackRef = useRef(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((value) => {
    if (!trackRef.current) return;
    const pct = Math.max(0, Math.min(100, value));
    trackRef.current.style.setProperty('--fill', `${pct}%`);
    onValueChange?.(pct);
  }, [onValueChange]);

  useEffect(() => {
    updateSlider(initialValue);
  }, [initialValue, updateSlider]);

  const handlePointer = useCallback((clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    updateSlider((x / rect.width) * 100);
  }, [updateSlider]);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    handlePointer(e.clientX);
    const move = (ev) => { if (isDragging.current) handlePointer(ev.clientX); };
    const up = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }, [handlePointer]);

  return (
    <div className="cc-slider-block">
      <div 
        className="cc-slider-bar" 
        ref={trackRef} 
        onMouseDown={handleMouseDown}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={initialValue}
        tabIndex={0}
      >
        <div className="cc-slider-fill" />
        {Icon && (
          <div className="cc-slider-knob">
            <Icon size={11} />
          </div>
        )}
      </div>
    </div>
  );
});
