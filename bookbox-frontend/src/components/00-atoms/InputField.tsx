import React from "react";
import { inputFieldStyleNoIcon } from "@/styles/classes";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    setValue?: (value: string) => void;
    widthPercentage?: number; // New prop for width control (0-100)
}

const InputField: React.FC<InputFieldProps> = ({
    className = "", 
    value, 
    setValue, 
    label, 
    ...props
}) => {

    return (
        <div 
            className="relative"
        >
            <input 
                className={`${className} w-full`} // Ensure input fills container
                placeholder={label}
                value={value} 
                onChange={(e) => setValue && setValue(e.target.value)}
                {...props}
            />
        </div>
    );
};

export default InputField;