import React from "react";
import { Book, BookStatus } from "@/types/Book";
import BookInfoRow from "@components/00-atoms/BookInfoRow"
import Button from "@components/00-atoms/Button"
import { primaryButtonStyle, tertiaryButtonStyle, bookDetailsOverlayStyle, bookDeatilsOverlayCloseBtnStyle, bookDetailsOverlayWindowStyle} from "@/styles/classes";

interface BookDetailsOverlayProps {
  book: Book;
  onClose: () => void;
}

const BookDetailsOverlay: React.FC<BookDetailsOverlayProps> = ({
  book,
  onClose,
}) => (
  <div className={`${bookDetailsOverlayWindowStyle}`} >
      <div className={`${bookDetailsOverlayStyle}`}>
        <button
            className={`${bookDeatilsOverlayCloseBtnStyle}`}
            onClick={onClose}
            aria-label="Close">
            &times;
          </button>
        <div className="flex gap-6">
          <img
            src={book.coverUrl || "images/placeholder.jpg"}
            alt={book.title}
            className="w-full h-auto object-cover rounded"
          />
          <div>
            <div className="mt-8 grid gap-3">
              <BookInfoRow label="Title" value={book.title} />
              <BookInfoRow label="Author" value={book.author} />
              <BookInfoRow label="Added to library" value={new Date(book.dateAdded).toLocaleDateString()} />
              <BookInfoRow label="Status" value={BookStatus[book.status.toUpperCase() as keyof typeof BookStatus]} />
            </div>

            <div className="mt-auto">
              <Button className = {`${primaryButtonStyle} mt-12 relative z-10`}>
                Edit Book
              </Button>
              <Button className = {`${tertiaryButtonStyle} mt-4 relative z-10`}>
                Remove Book
              </Button>
            </div>
          </div>
        </div>
        <img
          src="/images/Booknav.png"
          className="h-15 w-full bg-repeat-x absolute left-0 bottom-0 z-0"
          draggable="false"/>
      </div>
    </div>
);

export default BookDetailsOverlay;
