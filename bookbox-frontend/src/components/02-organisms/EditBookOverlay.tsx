'use client';
import React, { useEffect, useRef } from "react";
import { bookOverlayWindowStyle, bookOverlayCloseButtonStyle, addBookOverlayHeaderStyle, addBookOverlayImageStyle, addBookOverlayStyle } from "@/styles/classes";
import { useBooks } from "@/context/BookContext";

interface EditBookOverlayProps {
  children?: React.ReactNode;
}

const EditBookOverlay: React.FC<EditBookOverlayProps> = ({
  children,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { updatedBook, setUpdatedBook, setSelectedBook } = useBooks();

  {/* Close on Escape key */ }
  useEffect(() => {
    if (!updatedBook) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedBook(updatedBook);
        setUpdatedBook(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setUpdatedBook]);

  {/* Close on outside click */ }
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setSelectedBook(updatedBook);
        setUpdatedBook(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setUpdatedBook]);

  if (!open) return null;

  return (
    <div className={`${bookOverlayWindowStyle}`} >
      <div className={`${addBookOverlayStyle}`}>
        <button
          className={`${bookOverlayCloseButtonStyle}`}
          onClick={
            () => {
              setSelectedBook(updatedBook);
              setUpdatedBook(null);
            }
          }
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

export default EditBookOverlay;
