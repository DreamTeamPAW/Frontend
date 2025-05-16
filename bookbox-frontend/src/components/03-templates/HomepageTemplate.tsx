import React, { useState, useEffect } from "react";
import NavBar from "@components/01-molecules/NavBar";
import PaginationAndFilter from "@components/02-organisms/PaginationAndFilter";
import BookGridWithPagination from "@components/02-organisms/BookGridWithPagination";
import BookDetailsOverlay from "@components/02-organisms/BookDetailsOverlay";
import { Book } from "@/types/Book";
import { useBooks } from "@/context/BookContext";

interface HomepageTemplateProps {
  loading: boolean;
}

const HomepageTemplate: React.FC<HomepageTemplateProps> = ({
  loading,
}) => {
  const [selected, setSelected] = useState<Book | null>(null);
  const { fetchBooks } = useBooks();



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
      <PaginationAndFilter />

      {/* Book Grid + Pagination */}
      <BookGridWithPagination
        loading={loading}
        setSelected={setSelected}
      />

      {/* Overlay for Book Details */}
      {selected && (
        <BookDetailsOverlay onBookDeleted={fetchBooks} book={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default HomepageTemplate;
