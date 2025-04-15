import React from "react";
import { labelStyle } from "@styles/classes";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, className = "", ...props }) => {
  return (
    <label className={`${labelStyle} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
