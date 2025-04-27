"use client";
import React, { useRef, useState, useEffect } from "react";
import { textButtonStyle, imageButtonStyle, navBarStyle, navBarSpacedTextButtons } from "@/styles/classes";
import Button from "../00-atoms/Button";
import HamburgerButton from "../00-atoms/HamburgerButton";
import Card from "../00-atoms/Card";
import Link from "next/link";

export const NavBar = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [addBookOpen, setAddBookOpen] = useState(false); // Overlay state
  const cardRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Close card dropdown on outside click
  useEffect(() => {
    if (!cardOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setCardOpen(false);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [cardOpen]);

  // Close Add Book overlay on Escape
  useEffect(() => {
    if (!addBookOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAddBookOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [addBookOpen]);

  return (
    <nav className={navBarStyle + " relative"}>
      <Link href="/home" passHref draggable="false">
        <Button noDefaultStyle className={imageButtonStyle} aria-label="Home" draggable="false">
          <img src="/images/Logo.png" alt="Logo" className="h-[72px] w-auto" draggable="false" />
        </Button>
      </Link>
      <div className={navBarSpacedTextButtons}>
        <Link href="/home" passHref draggable="false">
          <Button noDefaultStyle className={textButtonStyle} draggable="false">My library</Button>
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
          <Button noDefaultStyle className={textButtonStyle} draggable="false">My account</Button>
        </Link>
        <span ref={hamburgerRef}>
          <HamburgerButton open={cardOpen} onClick={() => setCardOpen((open) => !open)} />
        </span>
      </div>
      {/* Card Dropdown */}
      {cardOpen && (
        <div
          ref={cardRef}
          className="absolute right-0 mt-2"
          style={{ top: "100%" }}
        >
          <Card />
        </div>
      )}

      {/* Add Book Overlay */}
      {addBookOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={() => setAddBookOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add a Book</h2>
            {/* Add Book form */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
