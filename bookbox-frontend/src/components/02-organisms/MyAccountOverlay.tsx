'use client';
import React, { useEffect, useRef } from "react";
import {
  bookOverlayWindowStyle,
  bookOverlayCloseButtonStyle,
  addBookOverlayHeaderStyle as myAccountOverlayHeaderStyle,
  myAccountOverlayContentBaseStyle,
  myAccountOverlayImageStyle, 
  fillCoverImageStyle,
} from "@/styles/classes";
import { User } from "@/types/User";

interface MyAccountOverlayProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const MyAccountOverlay: React.FC<MyAccountOverlayProps> = ({
  open,
  onClose,
  user,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
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

  // Close on outside click
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
    <div className={`${bookOverlayWindowStyle}`} role="dialog" aria-modal="true">
      <div
        className={`${myAccountOverlayContentBaseStyle} relative flex flex-col h-75`}
        ref={popupRef}
      >
        <button
          className={`${bookOverlayCloseButtonStyle}`} 
          onClick={onClose}
          aria-label="Close account information dialog"
        >
          &times;
        </button>

        <div className="flex-grow overflow-y-auto relative z-10 p-4">
            <h2 className={`${myAccountOverlayHeaderStyle}`}>My Account</h2>

            {user ? (
              <div>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>User ID:</strong> {user._id}</p>
                <p><strong>User privilege:</strong> {user.role}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
        </div>

        <div className={`${myAccountOverlayImageStyle}`}>
             <img
              src="/images/Booknav.png"
              className={`${fillCoverImageStyle}`}
              draggable="false"
              alt="Decorative book navigation image"
            />
        </div>

      </div>
    </div>
  );
};

export default MyAccountOverlay;
