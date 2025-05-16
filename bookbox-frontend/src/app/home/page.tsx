import React from "react";
import HomePage from "@/components/04-pages/HomePage";
import "@/styles/globals.css";
import { BooksProvider } from "@/context/BookContext";
import { AuthProvider } from "@/context/AuthContext";



const Page: React.FC = () => {
  return <AuthProvider>
    <BooksProvider>
      <HomePage />;
    </BooksProvider>
  </AuthProvider>
};

export default Page;
