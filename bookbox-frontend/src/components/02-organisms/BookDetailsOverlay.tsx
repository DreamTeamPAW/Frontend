import React from "react";
import { Book } from "@/types/Book";

interface BookDetailsOverlayProps {
  book: Book;
  onClose: () => void;
}

const BookDetailsOverlay: React.FC<BookDetailsOverlayProps> = ({
  book,
  onClose,
}) => (
  <div
    className="fixed inset-0 bg-black flex items-center justify-center z-50"
    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
  >
    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <img
        src={book.coverUrl || "images/placeholder.jpg"}
        alt={book.title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="mt-4 text-xl font-bold">{book.title}</h2>
      <p className="mt-2 text-gray-700">{book.author}</p>
    </div>
  </div>
);

export default BookDetailsOverlay;
