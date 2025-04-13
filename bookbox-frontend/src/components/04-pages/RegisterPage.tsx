"use client";
import React, { useEffect, useState } from "react";
import RegisterTemplate from "../03-templates/RegisterTemplate";
import RegisterForm from "../02-organisms/RegisterForm";
import { backgroundImageLoginPage } from "@/styles/classes";

const RegisterPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = window.innerWidth / window.outerWidth;

      setScale(1/zoomLevel);

      const newTranslateX = (zoomLevel - 1) * -500; 
      setTranslateX(newTranslateX);
    };
    window.addEventListener("resize", handleZoom);
    handleZoom();

    return () => {
      window.removeEventListener("resize", handleZoom);
    };
  }, []);

  return (
    <div style={backgroundImageLoginPage.backgroundContainer}>
      <div className="relative h-screen w-screen overflow-hidden">
        <img
          src="/images/bg1.png"
          alt="Left Image"
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-50"
          style={{
            transform: `scale(${-scale}) translateX(${translateX}px)`,
          }}
        />
          <div
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-00"
            style={{
              transform: `translateX(${-translateX}px)`,
            }}
          >
            <RegisterTemplate>
              <RegisterForm />
            </RegisterTemplate>
          </div>
        </div>
      </div>
    );
  };

export default RegisterPage;
