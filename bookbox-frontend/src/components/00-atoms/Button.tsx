import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-6 py-3 text-white rounded-full shadow-lg hover:drop-shadow-xl transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;