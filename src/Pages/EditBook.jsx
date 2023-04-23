import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditBook = () => {
    const { currentUser } = useSelector((state) => state.booklistuser);
    const location = useLocation();
    const book = location.state?.bookData;
  const [bookData, setBookData] = useState({
    title: book.title,
    desc: book.desc,
    publisher: book.publisher,
    author: book.author,
    isbn: book.isbn,
    userid: currentUser._id,
  });
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

//   console.log(bookData)

  const formHandler = async (formData) => {
    if (
      formData.title === "" ||
      formData.desc === "" ||
      formData.publisher === "" ||
      formData.author === "" ||
      formData.isbn === ""
    ) {
      setError(true);
      setErrorMsg("Please fill all the field");
    } else {
      const res = await axios.put(
        `https://booklist-backend-q6e3.onrender.com/api/books/update/${book._id}`,
        formData,
        { headers: { token: "Bearer " + currentUser.accesstoken } }
      );

      res.data && navigate("/")
    }
  };

  return (
    <div className="register addbook">
      <div className="register_main-div main-add-book">
        <Link to="/">
        <button className="logout-button" style={{margin:"0 auto"}}>
          Show Book List
        </button>
        </Link>
      
        <h2 className="register_title main-add-book-title">Update Book</h2>
        <input
          placeholder="Title of the Book"
          className="register_username__input"
          type="text"
          value={bookData.title}
          onChange={(e) => {
            setBookData({ ...bookData, title: e.target.value });
          }}
        />
        <input
          placeholder="ISBN"
          className="register_password__input"
          type="text"
          value={bookData.isbn}
          onChange={(e) => {
            setBookData({ ...bookData, isbn: e.target.value });
          }}
        />
        <input
          placeholder="Author"
          className="register_confirm_password__input"
          type="text"
          value={bookData.author}
          onChange={(e) => {
            setBookData({ ...bookData, author: e.target.value });
          }}
        />
        <input
          placeholder="Describe this Book"
          className="register_password__input"
          type="text"
          value={bookData.desc}
          onChange={(e) => {
            setBookData({ ...bookData, desc: e.target.value });
          }}
        />

        <input
          placeholder="Publisher of this Book"
          className="register_password__input"
          type="text"
          value={bookData.publisher}
          onChange={(e) => {
            setBookData({ ...bookData, publisher: e.target.value });
          }}
        />
        <button
          className="register_button"
          onClick={() => formHandler(bookData)}
        >
          UPDATE BOOK
        </button>
        {error && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>
    </div>
  )
}

export default EditBook