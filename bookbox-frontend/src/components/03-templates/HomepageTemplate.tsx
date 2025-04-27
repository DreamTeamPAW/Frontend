"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../01-molecules/NavBar";
import PaginationAndFilter from "../02-organisms/PaginationAndFilter";
import { getBooks } from "@/services/bookService";
import { Book } from "@/types/Book";
import { BookPagination, PaginationParams } from "@/types/Pagination";
import { Pagination } from "antd"; // Ant Design Pagination

const HomepageTemplate: React.FC = () => {
  const [query, setFilter] = useState("");
  const [limit, setLimit] = useState(15); // limit = pageSize
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<BookPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Book | null>(null);

  useEffect(() => {
    setLoading(true);
    const params: PaginationParams = {
      page,
      limit,
      query,
    };
    getBooks(params)
      .then((data) => {
        setBooks(data.books);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [query, limit, page]);

  useEffect(() => {
    if (!selected) return; // Only listen when overlay is open
  
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selected]);
  
  useEffect(() => {
    document.documentElement.style.overflowY = "scroll";
    return () => {
      document.documentElement.style.overflowY = "";
    }; }, []);

  return (
    <div>
      <NavBar />
      <img
        src="/images/Booknav.png"
        alt="Logo"
        className="h-20 w-full bg-repeat-x"
        draggable="false"
      />
      <PaginationAndFilter
        filter={query}
        setFilter={setFilter}
        pageSize={limit}
        setPageSize={setLimit}
      />

      {/* Book Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 text-center">Loading...</div>
          ) : books.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              No books found.
            </div>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg transition"
                onClick={() => setSelected(book)}
              >
                <img
                  src={book.coverUrl || "images/placeholder.jpg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{book.title}</h3>
                  <p className="text-gray-500">{book.author}</p>
                </div>
              </div>
            ))
          )}
        </div>


        {/* Pagination Controls */}
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

      {/* Overlay for Book Details */}
      {selected && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selected.coverUrl || "images/placeholder.jpg"}
              alt={selected.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-4 text-xl font-bold">{selected.title}</h2>
            <p className="mt-2 text-gray-700">{selected.author}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomepageTemplate;
