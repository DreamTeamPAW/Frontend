'use client'
import React from "react";
import "@/styles/globals.css";
import AddBookOverlay from "@/components/02-organisms/AddBookOverlay";
import AddBookForm from "@/components/02-organisms/AddBookForm";



const Page: React.FC = () => {
  return <AddBookOverlay open={true} onClose={() => { }} >
    <AddBookForm />
  </AddBookOverlay>
};

export default Page;
