"use client";
import React, { useRef, useState, useEffect } from "react";
import { textButtonStyle, imageButtonStyle, navBarStyle, navBarSpacedTextButtons } from "@/styles/classes";
import Button from "../00-atoms/Button";
import HamburgerButton from "../00-atoms/HamburgerButton";
import Card from "../00-atoms/Card";
import Link from "next/link";

export const NavBar = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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
            <Button noDefaultStyle className={textButtonStyle} draggable="false">Add book</Button>
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
    </nav>
  );
};

export default NavBar;
