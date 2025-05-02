import React, { useEffect, useRef } from "react";

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

  {/* Close on Escape key */}
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

 {/* Close on outside click */}
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
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div
        ref={popupRef}
        className="bg-white rounded-lg p-8 max-w-md w-full relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add a Book</h2>
        {children /*add book form*/}
      </div>
    </div>
  );
};

export default AddBookOverlay;
