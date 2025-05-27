import React from "react";
import {
    inputFieldStyleNoIcon,
    bookInfoRowPrimaryTextStyle,
    inputFieldRowContainerStyle
} from "@/styles/classes";
import InputField from "./InputField";

interface InputFieldRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
    setValue?: (value: string) => void;
}

const InputFieldRow: React.FC<InputFieldRowProps> = ({ label, value, setValue }) => (
    <div className={`${inputFieldRowContainerStyle}`}>
        <label className={`${bookInfoRowPrimaryTextStyle}`}>{label}</label>
        <InputField
            type="text"
            value={value}
            label={label}
            onChange={(e) => setValue && setValue(e.target.value)}
            className={`${inputFieldStyleNoIcon} ${bookInfoRowPrimaryTextStyle}`}
        />
    </div>
);

export default InputFieldRow;
