import React from "react";
import Button from "@components/00-atoms/Button";
import TwoLabels from "@components/01-molecules/TwoLabels"
import { bookBoxLabelStyle, loginFlavorTextLabelStyle, secondaryButtonStyle } from "@/styles/classes";
import Link from "next/link";

interface LoginTemplateProps {
  children: React.ReactNode; 
}


const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute left-[10%] w-full max-w-md">
      <TwoLabels
        label1={{
          text: 'Book Box',
          className: `${bookBoxLabelStyle}`,
        }}
        label2={{
          text: 'Log in to your private library',
          className: `${loginFlavorTextLabelStyle}`,
        }}
      />
        {children}
        <Link href="/register">
            <Button type="submit" className= {`${secondaryButtonStyle} mt-4 w-lg`}>
            Sign in
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginTemplate;
