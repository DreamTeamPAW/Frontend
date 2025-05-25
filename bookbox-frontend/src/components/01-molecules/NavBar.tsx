"use client";
import React, { useState } from "react";
import {
  textButtonStyle,
  imageButtonStyle,
  navBarStyle,
  navBarSpacedTextButtons,
} from "@/styles/classes";
import Button from "@components/00-atoms/Button";
import Link from "next/link";
import AddBookOverlay from "@/components/02-organisms/AddBookOverlay";
import AddBookForm from "../02-organisms/AddBookForm";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useBooks } from "@/context/BookContext";
import { toast, ToastContainer } from "react-toastify";
import { triggerAsyncId } from "async_hooks";
import { useAuth } from "@/context/AuthContext";
import { ADMIN_PANEL_URL, API_URL } from "@/services/constants";
import MyAccountOverlay from "../02-organisms/MyAccountOverlay";

interface NavBarProps {
}


export const NavBar: React.FC<NavBarProps> = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const [myAccountOpen, setMyAccountOpen] = useState(false);
  const router = useRouter();
  const { triggerSuccessMessage, successMessage } = useBooks();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={navBarStyle + " relative"}>
      <Link href="/home" passHref draggable="false">
        <Button
          noDefaultStyle
          className={imageButtonStyle}
          aria-label="Home"
          draggable="false"
        >
          <img
            src="/images/Logo.png"
            alt="Logo"
            className="h-[72px] w-auto"
            draggable="false"
          />
        </Button>
      </Link>
      <div className={navBarSpacedTextButtons}>
        {user?.role === "admin" && (
          <Link href={`${API_URL}${ADMIN_PANEL_URL}`} passHref draggable="false">
            <Button noDefaultStyle className={textButtonStyle} draggable="false">
              Admin panel
            </Button>
          </Link>
        )}

        <Link href="/home" passHref draggable="false">
          <Button noDefaultStyle className={textButtonStyle} draggable="false">
            My library
          </Button>
        </Link>
        <Button
          noDefaultStyle
          className={textButtonStyle}
          draggable="false"
          onClick={() => setAddBookOpen(true)}
        >
          Add book
        </Button>
        <Button
          noDefaultStyle
          className={textButtonStyle}
          draggable="false"
          onClick={() => setMyAccountOpen(true)}
        >
          My account
        </Button>
        <Button noDefaultStyle className={textButtonStyle} draggable="false" onClick={handleLogout}>
          Logout
        </Button>
        {successMessage && (
          <div>
            <ToastContainer />
          </div>
        )}
      </div>


      {/* Add Book Overlay as a molecule */}
      <AddBookOverlay open={addBookOpen} onClose={() => setAddBookOpen(false)} >
        <AddBookForm onAdd={() => {
          setAddBookOpen(false)
        }} />
      </AddBookOverlay>

      {/* My Account Overlay as a molecule */}
      <MyAccountOverlay user={user} open={myAccountOpen} onClose={() => setMyAccountOpen(false)} >
        <AddBookForm onAdd={() => {
          setAddBookOpen(false)
        }} />
      </MyAccountOverlay>
    </nav>
  );
};

export default NavBar;
