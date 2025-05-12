import React from 'react';
import InputFieldRow from '../00-atoms/InputFieldRow';
import Button from '../00-atoms/Button';
import { addBookFormButtonStyle, addBookFormImageStyle, addBookFormStyle, primaryButtonStyle } from '@/styles/classes';
import DropdownInputRow from '../00-atoms/DropdownInputRow';
import { BookStatus } from '@/types/Book';
import FilePicker from '../00-atoms/FilePicker';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [status, setStatus] = React.useState(BookStatus.UNREAD);
  const [coverUrl, setCoverUrl] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, author, status, coverUrl });
  };

  return (
    <div className="flex">
      <img
        src={coverUrl || "/images/placeholder.jpg"}
        alt="Book Cover"
        className={`${addBookFormImageStyle}`}
        draggable="false"
      />

      <form
        onSubmit={handleSubmit}
        className={`${addBookFormStyle}`}
      >
        <InputFieldRow value={title} setValue={setTitle} label="Title" />
        <InputFieldRow value={author} setValue={setAuthor} label="Author" />
        <DropdownInputRow
          label="Status"
          enumObj={BookStatus}
          selectedOption={status}
          setSelectedOption={setStatus}
        />
        <FilePicker
          pickedFile={file}
          fileRef={fileRef}
          onFileChange={handleFileChange} />
        <Button type="submit" className={`${addBookFormButtonStyle}`}>
          Add Book
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;
