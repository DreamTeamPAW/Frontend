import React from "react";
import { inputFieldIconStyle } from "@/styles/classes";
import { inputFIeldStyle } from "@/styles/classes";

interface IconInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const IconInputField: React.FC<IconInputFieldProps> = ({icon, className = "", ...props}) => {
return (
    <div className="relative">
        {icon && (
            <span className={`${inputFieldIconStyle}`}>
                {icon}
            </span>
        )}
        <input className={`${inputFIeldStyle} ${className}`} {...props} />
    </div>
    );
}

export default IconInputField;