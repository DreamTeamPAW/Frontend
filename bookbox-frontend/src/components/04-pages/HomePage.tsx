"use client";
import React, { useEffect, useState } from "react";
import HomepageTemplate from "@/components/03-templates/HomepageTemplate";
import { useAuth } from "@/context/AuthContext";
import { useBooks } from "@/context/BookContext";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [refetchTrigger] = useState(0);
  const { user } = useAuth();
  const { fetchBooks } = useBooks();
  const { currentParams } = useBooks();

  const router = useRouter();
  const debouncedFetchBooks = useDebouncedCallback((params) => {
    setLoading(true);
    fetchBooks(params)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, 500);

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    debouncedFetchBooks(currentParams);
  }, [currentParams.query, currentParams.limit, currentParams.page, user?._id, refetchTrigger]);

  return (
    <HomepageTemplate
      loading={loading}
    />
  );
};

export default HomePage;
