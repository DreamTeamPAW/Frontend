import React from "react";
import { buttonStyle } from "../../styles/classes"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
    return (
      <button className={`${buttonStyle} ${className}`} {...props}>
          {children}
      </button>
    );
};

export default Button;