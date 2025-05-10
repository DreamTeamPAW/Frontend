import React from "react";
import { bookInfoRowPrimaryTextStyle, bookStatusDropdownTextStyle, dropdownFieldStyle, inputFieldStyleNoIcon } from "@/styles/classes";

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
        <div className="flex justify-between items-center mb-2">
            <span className={`${bookInfoRowPrimaryTextStyle} w-[52%]`}>{label}</span>
            <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(
                    e.target.value as T[keyof T]
                )}
                className={`${dropdownFieldStyle} ${bookStatusDropdownTextStyle} w-[50%] appearance-none`}
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