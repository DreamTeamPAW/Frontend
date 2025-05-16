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

interface NavBarProps {
}


export const NavBar: React.FC<NavBarProps> = () => {
  const [addBookOpen, setAddBookOpen] = useState(false);
  const router = useRouter();

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
        <Link href="/home" passHref draggable="false">
          <Button noDefaultStyle className={textButtonStyle} draggable="false">
            My account
          </Button>
        </Link>
        <Button noDefaultStyle className={textButtonStyle} draggable="false" onClick={handleLogout}>
          Logout
        </Button>
      </div>


      {/* Add Book Overlay as a molecule */}
      <AddBookOverlay open={addBookOpen} onClose={() => setAddBookOpen(false)} >
        <AddBookForm />
      </AddBookOverlay>
    </nav>
  );
};

export default NavBar;
