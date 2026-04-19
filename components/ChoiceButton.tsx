"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { Choice } from "@/types/game";

interface ChoiceButtonProps {
  choice: Choice;
  label: string;
  index: number;
  disabled?: boolean;
  isSelected?: boolean;
  isEntering?: boolean;
  onSelect: (choice: Choice) => void;
}

interface RippleState {
  x: number;
  y: number;
  key: number;
}

export function ChoiceButton({
  choice,
  label,
  index,
  disabled = false,
  isSelected = false,
  isEntering = false,
  onSelect,
}: ChoiceButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripple, setRipple] = useState<RippleState | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipple({
      x,
      y,
      key: Date.now(),
    });

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setRipple(null);
    }, 620);
  };

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    setIsPressed(true);
    createRipple(event);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`choice-button ${isPressed ? "choice-pressed" : ""} ${
        isSelected ? "choice-selected" : ""
      } ${isEntering ? "choice-entering" : ""} ${
        disabled ? "cursor-not-allowed opacity-80" : ""
      }`}
      style={
        isEntering
          ? {
              animationDelay: `${index * 100}ms`,
            }
          : undefined
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => {
        if (!disabled) {
          onSelect(choice);
        }
      }}
    >
      <span className="choice-accent" aria-hidden="true" />

      {ripple ? (
        <span
          key={ripple.key}
          className="choice-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          aria-hidden="true"
        />
      ) : null}

      <span className="choice-label">{label}</span>

      <span className="choice-main">
        <span className="choice-text">{choice.text}</span>
        {choice.subtext ? <span className="choice-subtext">{choice.subtext}</span> : null}
      </span>

      <span className="choice-arrow" aria-hidden="true">
        {"\u2192"}
      </span>
    </button>
  );
}
