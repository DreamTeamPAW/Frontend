"use client";

import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({icon, className = "", ...props}) => {
return (
    <div className="relative group">
        {icon && (
            <span className="absolute left-4 inset-y-0 flex items-center 
                text-[var(--disabled-icon-color)] group-focus-within:text-[var(--text-input-color)]" >
                {icon}
            </span>
        )}
        <input className={`py-2 ${icon ? "pl-10" : "pl-4"} pr-4 rounded-xl bg-[var(--contrast-text-color)] transition focus:outline-none
                border-1 border-[var(--disabled-border-color)] focus:border-[var(--focused-border-color)]
                shadow-md focus:shadow-lg shadow-[var(--primary-shadow-color)] focus:shadow-[var(--secondary-shadow-color)]
                text-[var(--text-input-color)] focus:text-[var(--primary-text-color)] 
                ${className}`} {...props} />
    </div>
    );
}

export default InputField;