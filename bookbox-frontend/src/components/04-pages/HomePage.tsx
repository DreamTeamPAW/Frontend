"use client";
import React, { useEffect, useState } from "react";
import HomepageTemplate from "@/components/03-templates/HomepageTemplate";
import { getBooks } from "@/services/bookService";
import { Book } from "@/types/Book";
import { BookPagination, PaginationParams } from "@/types/Pagination";

const HomePage: React.FC = () => {
  const [query, setFilter] = useState("");
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<BookPagination | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params: PaginationParams = { page, limit, query };
    getBooks(params)
      .then((data) => {
        setBooks(data.books);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [query, limit, page]);

  return (
    <HomepageTemplate
      books={books}
      pagination={pagination}
      loading={loading}
      query={query}
      setFilter={setFilter}
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
    />
  );
};

export default HomePage;