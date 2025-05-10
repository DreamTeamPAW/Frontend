import React from "react";
import { inputFieldStyleNoIcon, bookInfoRowPrimaryTextStyle } from "@/styles/classes";
import InputField from "./InputField";

interface InputFieldRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    setValue?: (value: string) => void;
}

const InputFieldRow: React.FC<InputFieldRowProps> = ({ label, value, setValue }) => (
    <div className="flex justify-between w-full mb-2">
        <label className={`${bookInfoRowPrimaryTextStyle} w-[50%]`}>{label}</label>
        <InputField
            type="text"
            value={value}
            label={label}
            onChange={(e) => setValue && setValue(e.target.value)}
            className = {`${inputFieldStyleNoIcon} ${bookInfoRowPrimaryTextStyle} w-[50%]`}
        />
    </div>
);

export default InputFieldRow;
