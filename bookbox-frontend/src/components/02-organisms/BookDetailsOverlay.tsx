import React from "react";
import { Book, BookStatus } from "@/types/Book";
import BookInfoRow from "@components/00-atoms/BookInfoRow";
import Button from "@components/00-atoms/Button";
import {
  primaryButtonStyle,
  tertiaryButtonStyle,
  bookOverlayWindowStyle,
  bookOverlayCloseButtonStyle,
  bookOverlayStyle,
  bookOverlayDeletePopupStyle1,
  bookOverlayDeletePopupStyle2,
} from "@/styles/classes";
import { deleteBook } from "@/services/bookService";

interface BookDetailsOverlayProps {
  book: Book;
  onClose: () => void;
  onBookDeleted?: () => void;
}

const BookDetailsOverlay: React.FC<BookDetailsOverlayProps> = ({
  book,
  onClose,
  onBookDeleted,
}) => {
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <div className={bookOverlayWindowStyle}>
      <div className={bookOverlayStyle}>
        <button
          className={bookOverlayCloseButtonStyle}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex gap-6">
          <img
            src={
              book.cover && book.cover.startsWith("data:image/")
                ? book.cover
                : "images/placeholder.jpg"
            }
            alt={book.title}
            className="w-full h-auto object-cover rounded"
          />
          <div>
            <div className="mt-8 grid gap-3">
              <BookInfoRow label="Title" value={book.title} />
              <BookInfoRow label="Author" value={book.author} />
              <BookInfoRow
                label="Added to library"
                value={new Date(book.dateAdded).toLocaleDateString()}
              />
              <BookInfoRow
                label="Status"
                value={
                  BookStatus[
                    book.status.toUpperCase() as keyof typeof BookStatus
                  ]
                }
              />
            </div>

            <div className="mt-auto">
              <Button className={`${primaryButtonStyle} mt-12 relative z-10`}>
                Edit Book
              </Button>
              <Button
                className={`${tertiaryButtonStyle} mt-4 relative z-10`}
                onClick={() => setShowConfirm(true)}
              >
                Remove Book
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/images/Booknav.png"
          className="h-15 w-full bg-repeat-x absolute left-0 bottom-0 z-0"
          draggable="false"
        />
      </div>

      {/* Confirmation Overlay */}
      {showConfirm && (
        <div className={bookOverlayDeletePopupStyle1}>
          <div className={bookOverlayDeletePopupStyle2}>
            <h2 className="text-lg font-semibold mb-4">Remove Book</h2>
            <p className="mb-6">
              Are you sure you want to remove <span className="font-bold break-all">"{book.title}"</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className={primaryButtonStyle}
                onClick={async () => {
                  try {
                    await deleteBook(book._id);
                    if (onBookDeleted) onBookDeleted();
                    onClose();
                  } catch (error) {
                    alert("Failed to delete book.");
                    console.error(error);
                  }
                }}
              >
                Yes, Remove
              </Button>
              <Button
                className={tertiaryButtonStyle}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsOverlay;
