import React from "react";
import { Book, BookStatus, BookStatusColors } from "@/types/Book";
import { Pagination } from "antd";
import Label from "@components/00-atoms/Label";
import { paginationBookElementStyle, primaryTextStyle } from "@/styles/classes";
import StatusCard from "@/components/01-molecules/StatusCard";
import { useBooks } from "@/context/BookContext";

interface Props {
  loading: boolean;
  setSelected: (b: Book) => void;
}


const BookGridWithPagination: React.FC<Props> = ({
  loading,
  setSelected,
}) => {
  const BOOK_CARD_WIDTH = 250;
  const BOOK_CARD_HEIGHT = 375;
  const { books, currentParams } = useBooks();
  const { updateBookStatus, updateParams } = useBooks();

  return (
    <div className="p-8">
      <div
        className="grid gap-20 justify-center"
        style={{ gridTemplateColumns: `repeat(auto-fill, ${BOOK_CARD_WIDTH}px)` }}
      >
        {loading ? (
          <div className="col-span-3 text-center">Loading...</div>
        ) : books?.books.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No books found.
          </div>
        ) : (
          books?.books.map((book: Book) => {
            return (
              <div key={book._id} className="relative" style={{ width: BOOK_CARD_WIDTH }}>
                <div
                  className={paginationBookElementStyle}
                  style={{
                    borderColor: BookStatusColors[book.status.toUpperCase() as keyof typeof BookStatusColors] || "#d1d5db",
                    width: '100%',
                    height: BOOK_CARD_HEIGHT,
                  }}
                  onClick={() => setSelected(book)}
                >
                  <div
                    className="flex items-center justify-center overflow-hidden"
                    style={{
                      height: BOOK_CARD_HEIGHT,
                      width: '100%',
                    }}
                  >
                    <img
                      src={
                        book.cover && book.cover.startsWith("data:image/")
                          ? book.cover
                          : "images/placeholder.jpg"
                      }
                      alt={book.title}
                      className="object-contain max-h-full max-w-full"
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                      }}
                    />
                  </div>
                  {/* StatusCard in top-right */}
                  <StatusCard
                    currentStatus={book.status}
                    statusColors={BookStatusColors}
                    statuses={Object.keys(BookStatusColors)}
                    onChange={async (newStatus) => {
                      const modifiedBook = {
                        userId: book.userID,
                        title: book.title,
                        author: book.author,
                        cover: book.cover,
                        status: newStatus.toLowerCase(),
                        dateAdded: book.dateAdded.toString(),
                      }
                      book.status = BookStatus[newStatus as keyof typeof BookStatus];
                      await updateBookStatus(modifiedBook, book._id);
                    }}
                  />
                </div>
                <Label className={`${primaryTextStyle} text-center mt-3 truncate w-full`}>
                  {book.title}
                </Label>
              </div>
            );
          })
        )}
      </div>
      {books?.pagination && books.pagination.totalBooks > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={books.pagination.currentPage}
            total={books.pagination.totalBooks}
            pageSize={books.pagination.limit}
            onChange={(newPage) => {
              updateParams({ ...currentParams, page: newPage });
            }}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default BookGridWithPagination;
