import React from "react";
import { Book, BookStatus, BookStatusColors } from "@/types/Book";
import { BookPagination } from "@/types/Pagination";
import { Pagination } from "antd";
import Label from "@components/00-atoms/Label";
import { paginationBookElementStyle, primaryTextStyle } from "@/styles/classes";
import StatusCard from "@/components/01-molecules/StatusCard";
import { updateBook } from "@/services/bookService";

interface Props {
  books: Book[];
  loading: boolean;
  pagination: BookPagination | null;
  setPage: (n: number) => void;
  setSelected: (b: Book) => void;
  onBookUpdated: () => void;
}

const BookGridWithPagination: React.FC<Props> = ({
  books,
  loading,
  pagination,
  setPage,
  setSelected,
  onBookUpdated,
}) => (
  <div className="p-8">
    <div
      className="grid gap-20 justify-center"
      style={{ gridTemplateColumns: "repeat(3, 250px)" }}
    >
      {loading ? (
        <div className="col-span-3 text-center">Loading...</div>
      ) : books.length === 0 ? (
        <div className="col-span-3 text-center text-gray-500">
          No books found.
        </div>
      ) : (
        books.map((book) => {
          return (
            <div key={book._id} className="relative">
              <div
                className={paginationBookElementStyle}
                style={{
                  borderColor: BookStatusColors[book.status.toUpperCase() as keyof typeof BookStatusColors] || "#d1d5db", // fallback to gray-300
                }}
                onClick={() => setSelected(book)}
              >
                <img
                  src={
                      book.cover && book.cover.startsWith("data:image/")
                        ? book.cover
                        : "images/placeholder.jpg"
                      }
                  alt={book.title}
                  className="w-full h-auto object-cover rounded-t-lg"
                />
                {/* StatusCard in top-right */}
                <StatusCard
                  currentStatus={book.status}
                  statusColors={BookStatusColors}
                  statuses={Object.keys(BookStatusColors)}
                  onChange={async (newStatus) => {
                    // update logic
                    book.status = newStatus.toLowerCase();
                    await updateBook(book,book._id);
                    if (onBookUpdated) {
                      onBookUpdated(); 
                    }
                  }}
                />
              </div>
              <Label className={`${primaryTextStyle} text-center mt-3 truncate w-[250px]`}>
                {book.title}
              </Label>
            </div>
          );
        })
      )}
    </div>
    {pagination && pagination.totalPages > 1 && (
      <div className="flex justify-center mt-8">
        <Pagination
          current={pagination.currentPage}
          total={pagination.totalBooks}
          pageSize={pagination.limit}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>
    )}
  </div>
);

export default BookGridWithPagination;
