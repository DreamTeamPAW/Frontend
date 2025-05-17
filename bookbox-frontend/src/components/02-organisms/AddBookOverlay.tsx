'use client';
import React, { useEffect, useRef } from "react";
import { bookOverlayWindowStyle, bookOverlayCloseButtonStyle, addBookOverlayHeaderStyle, addBookOverlayImageStyle, addBookOverlayStyle } from "@/styles/classes";

interface AddBookOverlayProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const AddBookOverlay: React.FC<AddBookOverlayProps> = ({
  open,
  onClose,
  children,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  {/* Close on Escape key */ }
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  {/* Close on outside click */ }
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={`${bookOverlayWindowStyle}`} >
      <div className={`${addBookOverlayStyle}`}>
        <button
          className={`${bookOverlayCloseButtonStyle}`}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className={`${addBookOverlayHeaderStyle}`}>Add a Book</h2>
        {children}
        <img
          src="/images/Booknav.png"
          className={`${addBookOverlayImageStyle}`}
          draggable="false"
        />
      </div>
    </div>
  );
};

export default AddBookOverlay;
