'use client'
import React from "react";
import "@/styles/globals.css";
import AddBookOverlay from "@/components/02-organisms/AddBookOverlay";
import AddBookForm from "@/components/02-organisms/AddBookForm";
import NotificationCard from "@/components/00-atoms/NotificationCard";



const Page: React.FC = () => {
  return <NotificationCard showSuccess={true} successText="New test text"/>

};

export default Page;
