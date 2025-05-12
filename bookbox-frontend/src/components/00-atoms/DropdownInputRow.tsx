import React from "react";
import {
    bookInfoRowPrimaryTextStyle,
    dropdownRowContainerStyle,
    dropdownStyle,
} from "@/styles/classes";

interface DropdownInputRowProps<T extends Record<string, string>> {
    label: string;
    enumObj: T;
    selectedOption: T[keyof T];
    setSelectedOption: (option: T[keyof T]) => void;
}

const DropdownInputRow = <T extends Record<string, string>>({
    label,
    enumObj,
    selectedOption,
    setSelectedOption,
}: DropdownInputRowProps<T>) => {
    const options = Object.values(enumObj);

    return (
        <div className={`${dropdownRowContainerStyle}`}>
            <span className={`${bookInfoRowPrimaryTextStyle}`}>{label}</span>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(
                    e.target.value as T[keyof T]
                )}
                className={`${dropdownStyle}`}
            >
                {options.map((option) => (
                    <option key={option} value={option} className={`${bookInfoRowPrimaryTextStyle}`}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownInputRow;
