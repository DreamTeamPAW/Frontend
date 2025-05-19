import React, { useEffect } from "react";
import NavBar from "@components/01-molecules/NavBar";
import PaginationAndFilter from "@components/02-organisms/PaginationAndFilter";
import BookGridWithPagination from "@components/02-organisms/BookGridWithPagination";
import BookDetailsOverlay from "@components/02-organisms/BookDetailsOverlay";
import { useBooks } from "@/context/BookContext";
import { ToastContainer } from "react-toastify";
import { updateBook } from "@/services/bookService";

interface HomepageTemplateProps {
  loading: boolean;
}

const HomepageTemplate: React.FC<HomepageTemplateProps> = ({
  loading,
}) => {
  const { selectedBook, setSelectedBook, updatedBook } = useBooks();



  useEffect(() => {
    if (!selectedBook) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedBook(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedBook]);

  useEffect(() => {
    document.documentElement.style.overflowY = "scroll";
    return () => {
      document.documentElement.style.overflowY = "";
    };
  }, []);

  return (
    <div>
      <ToastContainer />
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
        setSelected={setSelectedBook}
      />

      {/* Overlay for Book Details */}
      {selectedBook && (
        <BookDetailsOverlay />
      )}
    </div>
  );
};

export default HomepageTemplate;
