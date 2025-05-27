import React, { useEffect, useState } from 'react';
import InputFieldRow from '../00-atoms/InputFieldRow';
import { addBookFormButtonStyle, addBookFormImageStyle, addBookFormStyle, DEFAULT_BASE64_IMAGE, primaryButtonStyle } from '@/styles/classes';
import DropdownInputRow from '../00-atoms/DropdownInputRow';
import { Book, BookStatus, bookStatusToString, stringToBookStatus } from '@/types/Book';
import FilePicker from '../00-atoms/FilePicker';
import { getUser } from '@/services/authService';
import { useBooks } from '@/context/BookContext';
import { toast } from 'react-toastify';

interface EditBookFormProps {
  onBookUpdated?: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ onBookUpdated }) => {
  const { updatedBook } = useBooks();
  const [title, setTitle] = React.useState(updatedBook?.title || "");
  const [author, setAuthor] = React.useState(updatedBook?.author || "");
  const [status, setStatus] = React.useState(stringToBookStatus(updatedBook?.status || "") || BookStatus.UNREAD);
  const [cover, setCover] = React.useState(updatedBook?.cover || DEFAULT_BASE64_IMAGE);
  const [file, setFile] = React.useState<File | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { updateBook } = useBooks();


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
        setCover(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title !== "" && author !== "") {



      //console.log(statusKey); // "UNREAD"
      const modifiedBook = {
        userId: userId,
        title: title,
        author: author,
        cover: cover,
        status: bookStatusToString(status) || BookStatus.UNREAD,
        dateAdded: new Date().toISOString(),
      };

      try {
        await updateBook(modifiedBook, updatedBook?._id || "");
        
        //setSuccessMessage("Book modified successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        if (onBookUpdated) onBookUpdated();
      } catch (error) {
        toast.error("Failed to update book:", error)
        console.error("Failed to update book:", error);
      }
    }
  };
  return (
    <div className="flex">
      <img
        src={cover || "/images/placeholder.jpg"}
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

        <button type="submit" className={`${addBookFormButtonStyle}`}>
          Save Changes
        </button>
        {successMessage && (
          <div className="text-green-600 font-semibold mb-2">{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default EditBookForm;
