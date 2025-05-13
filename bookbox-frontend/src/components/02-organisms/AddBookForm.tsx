import React, { useEffect, useState } from 'react';
import InputFieldRow from '../00-atoms/InputFieldRow';
import Button from '../00-atoms/Button';
import { addBookFormButtonStyle, addBookFormImageStyle, addBookFormStyle, DEFAULT_BASE64_IMAGE, primaryButtonStyle } from '@/styles/classes';
import DropdownInputRow from '../00-atoms/DropdownInputRow';
import { Book, BookStatus } from '@/types/Book';
import FilePicker from '../00-atoms/FilePicker';
import { addBook } from '@/services/bookService';
import { getUser } from '@/services/authService';

interface AddBookFormProps {
  onBookAdded?: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onBookAdded }) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [status, setStatus] = React.useState(BookStatus.UNREAD);
  const [coverUrl, setCoverUrl] = React.useState(DEFAULT_BASE64_IMAGE);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


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
        status: statusKey,
        dateAdded: new Date().toISOString(),
      };
        console.log(newBook);
      try {
        const addedBook = await addBook(newBook);
        setTitle("");
        setAuthor("");
        setStatus(BookStatus.UNREAD);
        setCoverUrl(DEFAULT_BASE64_IMAGE);
        setFile(null);
        if (fileRef.current) fileRef.current.value = "";
        setSuccessMessage("Book added successfully!"); 
        setTimeout(() => setSuccessMessage(""), 3000);
        onBookAdded();
      } catch (error) {
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
          
        <Button type="submit" className={`${addBookFormButtonStyle}`}>
          Add Book
        </Button>
        {/*TODO ADJUST TO MAKE IT LOOK PRETTY*/}
        {successMessage && (
  <div className="text-green-600 font-semibold mb-2">{successMessage}</div>
)}
      </form>
    </div>
  );
};

export default AddBookForm;


