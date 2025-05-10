import React from 'react';
import InputFieldRow from '../00-atoms/InputFieldRow';
import Button from '../00-atoms/Button';
import { primaryButtonStyle } from '@/styles/classes';
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
    <div className="flex h-full"> 
      <div className="h-full mr-6 rounded-lg"> 
        <img
          src={coverUrl || "/images/placeholder.jpg"}
          alt="Book Cover"
          className="h-full w-auto object-contain rounded-lg"
          draggable="false"
        />
      </div>

      <form 
        onSubmit={handleSubmit}
        className="flex-col justify-between h-full"
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
            onFileChange={handleFileChange}/>
          <Button type="submit" className={`${primaryButtonStyle} mt-4 self-start`}>
            Add Book
          </Button>
      </form>
    </div>
  );
};

export default AddBookForm;