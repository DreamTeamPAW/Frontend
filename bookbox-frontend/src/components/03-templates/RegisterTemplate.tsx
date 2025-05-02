import React from "react";
import Button from "@components/00-atoms/Button";
import TwoLabels from "@components/01-molecules/TwoLabels"
import { bookBoxLabelStyle, loginFlavorTextLabelStyle, secondaryButtonStyle } from "@/styles/classes";
import Link from "next/link";

interface RegisterTemplateProps {
  children: React.ReactNode; 
}


const RegisterTemplate: React.FC<RegisterTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute left-[65%] w-full max-w-md">
      <TwoLabels
        label1={{
          text: 'Book Box',
          className: `${bookBoxLabelStyle}`,
        }}
        label2={{
          text: 'Register your private library',
          className: `${loginFlavorTextLabelStyle}`,
        }}
      />
        {children}
      </div>
    </div>
  );
};

export default RegisterTemplate;
