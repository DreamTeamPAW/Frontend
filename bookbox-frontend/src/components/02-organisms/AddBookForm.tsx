import React, { useEffect, useState } from 'react';
import InputFieldRow from '../00-atoms/InputFieldRow';
import { addBookFormButtonStyle, addBookFormImageStyle, addBookFormStyle, DEFAULT_BASE64_IMAGE, primaryButtonStyle } from '@/styles/classes';
import DropdownInputRow from '../00-atoms/DropdownInputRow';
import { BookStatus } from '@/types/Book';
import FilePicker from '../00-atoms/FilePicker';
import { getUser } from '@/services/authService';
import { useBooks } from '@/context/BookContext';
import { toast, ToastContainer } from 'react-toastify';

interface AddBookFormProps {
  onAdd: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd }) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [status, setStatus] = React.useState(BookStatus.UNREAD);
  const [coverUrl, setCoverUrl] = React.useState(DEFAULT_BASE64_IMAGE);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState("");
  const { addBook } = useBooks()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUser();
        setUserId(userResponse._id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title !== "" && author !== "") {

      const statusValue = status;
      const statusKey = Object.keys(BookStatus).find(key => BookStatus[key as keyof typeof BookStatus] === statusValue)?.toLowerCase();

      //console.log(statusKey); // "UNREAD"
      const newBook = {
        userId: userId,
        title: title,
        author: author,
        cover: coverUrl,
        status: statusKey || BookStatus.UNREAD,
        dateAdded: new Date().toISOString(),
      };
      try {
      await addBook(newBook);
      setTitle("");
      setAuthor("");
      setStatus(BookStatus.UNREAD);
      setCoverUrl(DEFAULT_BASE64_IMAGE);
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      onAdd();
    } catch (error: any) {
      if (error?.response?.status === 413) {
        toast.error("File is too large. Please choose a smaller file.");
      } else {
        toast.error("Failed to add book. Please try again.");
      }
      console.error("Failed to add book:", error);
    }
  }
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

        <div>
          <button type="submit" className={`${addBookFormButtonStyle}`}>
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;


