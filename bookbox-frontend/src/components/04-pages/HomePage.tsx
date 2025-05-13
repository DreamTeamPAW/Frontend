"use client";
import React, { useEffect, useState } from "react";
import HomepageTemplate from "@/components/03-templates/HomepageTemplate";
import { getBooks } from "@/services/bookService";
import { Book } from "@/types/Book";
import { BookPagination, PaginationParams } from "@/types/Pagination";
import { getUser } from "@/services/authService";

const HomePage: React.FC = () => {
  const [query, setFilter] = useState("");
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<BookPagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUser();
        setUserId(userResponse._id);
        console.log("UserId: ", userResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {

    if (!userId) return;
    console.log("UserId: ", userId);
    setLoading(true);
    const params: PaginationParams = { page, limit, query, userId };
    getBooks(params)
      .then((data) => {
        setBooks(data.books);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [query, limit, page, userId, refetchTrigger]);

  const refetchBooks = () => setRefetchTrigger((n) => n + 1);

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
      userId={userId}
      onBookUpdated={refetchBooks}
    />
  );
};

export default HomePage;