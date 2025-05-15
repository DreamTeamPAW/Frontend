'use client'
import React from "react";
import "@/styles/globals.css";
import AddBookOverlay from "@/components/02-organisms/AddBookOverlay";
import AddBookForm from "@/components/02-organisms/AddBookForm";
import NotificationCard from "@/components/00-atoms/NotificationCard";
import { useAutoDismissAlerts } from "@/components/hooks/useAutoDismissAlerts";

//const [alerts, triggerAlert, closeAlert] = useAutoDismissAlerts(20000);

const Page: React.FC = () => {
  return null//<NotificationCard alerts={alerts} onClose={closeAlert} />

};

export default Page;
