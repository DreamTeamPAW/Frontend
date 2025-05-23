import React from "react";
import { BookStatus } from "@/types/Book";
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
  addBookOverlayStyle,
  addBookOverlayImageStyle,
  addBookFormImageStyle,
  addBookFormButtonStyle,
  addBookOverlayHeaderStyle,
} from "@/styles/classes";
import { useBooks } from "@/context/BookContext";

interface BookDetailsOverlayProps { }

const BookDetailsOverlay: React.FC<BookDetailsOverlayProps> = () => {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const { deleteBook, fetchBooks, setSelectedBook, setUpdatedBook } = useBooks();
  const { currentParams } = useBooks();
  const { selectedBook } = useBooks();

  return (
    <div className={bookOverlayWindowStyle}>
      <div className={bookOverlayStyle}>
        <button
          className={bookOverlayCloseButtonStyle}
          onClick={() => setSelectedBook(null)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className={`${addBookOverlayHeaderStyle}`}>Book details</h2>
        <div className="flex justify-between items-center mt-4">
          <img
            src={
              selectedBook?.cover && selectedBook.cover.startsWith("data:image/")
                ? selectedBook.cover
                : "images/placeholder.jpg"
            }
            alt={selectedBook?.title}
            className={`${addBookFormImageStyle}`}
          />
          <div className="flex flex-col justify-around h-full">
            <div>
              <BookInfoRow label="Title" value={selectedBook?.title || ""} />
              <BookInfoRow label="Author" value={selectedBook?.author || ""} />
              <BookInfoRow
                label="Added to library"
                value={new Date(selectedBook?.dateAdded || new Date()).toLocaleDateString()}
              />
              <BookInfoRow
                label="Status"
                value={
                  BookStatus[
                  selectedBook?.status?.toUpperCase() as keyof typeof BookStatus
                  ]
                }
              />
            </div>
            <div className="flex flex-col">
              <Button
                className={`${addBookFormButtonStyle} mt-4`}
                onClick={() => {
                  setUpdatedBook(selectedBook);
                  setSelectedBook(null);
                }}
              >
                Edit Book
              </Button>
              <Button
                className={`${tertiaryButtonStyle} mt-4`}
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
              Are you sure you want to remove <span className="font-bold break-all">"{selectedBook?.title}"</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                className={primaryButtonStyle}
                onClick={async () => {
                  try {
                    if (!selectedBook) return;
                    await deleteBook(selectedBook._id);
                    await fetchBooks(currentParams);
                    setSelectedBook(null);
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
