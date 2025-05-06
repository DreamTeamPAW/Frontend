"use client";
import React, { useEffect, useState } from "react";
import LoginTemplate from "@components/03-templates/LoginTemplate";
import LoginForm from "@components/02-organisms/LoginForm";
import { backgroundImageLoginPage } from "@/styles/classes";

const ZOOM_THRESHOLD = 0.5;

const LoginPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleZoom = () => {
      const zl = window.innerWidth / window.outerWidth;
      setZoomLevel(zl);
      setScale(zl < 1 ? 1 / zl : 1);
      setTranslateX(zl < 1 ? (zl - 1) * -400 : 0);
    };
    window.addEventListener("resize", handleZoom);
    handleZoom();
    return () => window.removeEventListener("resize", handleZoom);
  }, []);

  return (
<div
  style={{
    ...backgroundImageLoginPage.backgroundContainer,
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* White overlay (z-index: 0) */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#fff",
      opacity: zoomLevel < ZOOM_THRESHOLD ? 1 : 0,
      pointerEvents: "none",
      zIndex: 0,
    }}
  />
  {/* Background image (z-index: 1) */}
  <img
    src="/images/bg1.png"
    alt="Left Image"
    draggable="false"
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-50"
    style={{
      transform: `scale(${scale}) translateX(${translateX}px)`,
      zIndex: 1,
      pointerEvents: "none", 
    }}
  />
  {/* Login form and content (z-index: 2) */}
  <div
    className="relative h-screen w-screen overflow-hidden"
    style={{ position: "relative", zIndex: 2 }}
  >
    <LoginTemplate>
      <LoginForm />
    </LoginTemplate>
  </div>
</div>

  );
};

export default LoginPage;
