import {
  bookInfoRowSecondaryTextStyle,
  tertiaryButtonStyle,
  filePickerContainerStyle,
  filePickerTextStyle,
  filePickerButtonStyle,
} from "@/styles/classes";

interface FilePickerProps {
  pickedFile: File | null;
  fileRef?: React.RefObject<HTMLInputElement | null>;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const FilePicker = ({ pickedFile, onFileChange, fileRef }: FilePickerProps) => {

  return (
    <div className="pt-2">
      <div className={`${filePickerContainerStyle}`}>
        <input
          type="file"
          ref={fileRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />

        <span className={`${filePickerTextStyle}`}>
          {pickedFile ? pickedFile.name : "No file chosen"}
        </span>
        {/* Custom styled button */}
        <button
          type="button"
          onClick={() => fileRef?.current?.click()}
          className={`${filePickerButtonStyle}`}
        >
          Choose File
        </button>
      </div>
    </div >
  );
};

export default FilePicker;
