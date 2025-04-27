import React from "react";
import { buttonStyle } from "../../styles/classes";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  noDefaultStyle?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  noDefaultStyle = false, 
  ...props
}) => {
  const combinedClassName = noDefaultStyle
    ? className
    : `${buttonStyle} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
