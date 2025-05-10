import React, { useRef, useState } from 'react';
import { bookInfoRowPrimaryTextStyle, bookInfoRowSecondaryTextStyle, primaryButtonStyle } from "@/styles/classes";

interface FilePickerProps {
  pickedFile: File | null;
  fileRef?: React.RefObject<HTMLInputElement|null>;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

const FilePicker = ({ pickedFile, onFileChange, fileRef}: FilePickerProps) => {

  return (
    <div className="flex justify-between w-full items-center gap-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileRef}
        onChange={onFileChange}
        className="hidden"
        accept="image/*"
      />
      
      {/* Display file name */}
        <span className={`${bookInfoRowPrimaryTextStyle} w-[50%] overflow-hidden text-ellipsis whitespace-nowrap`}>
            {pickedFile ? pickedFile.name : "No file chosen"}
        </span>
      {/* Custom styled button */}
      <button
        type="button"
        onClick={() => fileRef?.current?.click()}
        className={`${primaryButtonStyle} ${bookInfoRowSecondaryTextStyle} h-10 rounded-full w-[50%]`}
      >
        Choose File
      </button>
    </div>
  );
};

export default FilePicker;