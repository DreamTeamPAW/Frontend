import React, { useState, useEffect } from "react";
import NavBar from "@components/01-molecules/NavBar";
import PaginationAndFilter from "@components/02-organisms/PaginationAndFilter";
import BookGridWithPagination from "@components/02-organisms/BookGridWithPagination";
import BookDetailsOverlay from "@components/02-organisms/BookDetailsOverlay"; 
import { Book } from "@/types/Book";
import { BookPagination } from "@/types/Pagination";
import Label from "@components/00-atoms/Label";
import { primaryTextStyle } from "@/styles/classes";
import { getUser } from "@/services/authService";

interface HomepageTemplateProps {
  books: Book[];
  pagination: BookPagination | null;
  loading: boolean;
  query: string;
  setFilter: (q: string) => void;
  limit: number;
  setLimit: (n: number) => void;
  page: number;
  setPage: (n: number) => void;
  userId: string;
  onBookUpdated: () => void;
}

const HomepageTemplate: React.FC<HomepageTemplateProps> = ({
  books,
  pagination,
  loading,
  query,
  setFilter,
  limit,
  setLimit,
  page,
  setPage,
  userId,
  onBookUpdated,
}) => {
  const [selected, setSelected] = useState<Book | null>(null);


  
  useEffect(() => {
    if (!selected) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selected]);

  useEffect(() => {
    document.documentElement.style.overflowY = "scroll";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

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
        userId={userId}
      />

      {/* Book Grid + Pagination */}
      <BookGridWithPagination
        books={books}
        loading={loading}
        pagination={pagination}
        setPage={setPage}
        setSelected={setSelected}
        onBookUpdated={onBookUpdated}
      />

      {/* Overlay for Book Details */}
      {selected && (
        <BookDetailsOverlay book={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default HomepageTemplate;
