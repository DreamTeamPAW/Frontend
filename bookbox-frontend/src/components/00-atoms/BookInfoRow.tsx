import React from "react";
import { bookInfoRowPrimaryTextStyle, bookInfoRowSecondaryTextStyle } from "@/styles/classes";

interface BookInfoRowProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    value: string;
}

const BookInfoRow: React.FC<BookInfoRowProps> = ({ label, value }) => (
    <div className="flex w-lg justify-between">
        <span className={`${bookInfoRowPrimaryTextStyle} mb-2`}>{label}:</span>
        <span className={`${bookInfoRowSecondaryTextStyle} break-all`}>{value}</span>
    </div>
);

export default BookInfoRow;
