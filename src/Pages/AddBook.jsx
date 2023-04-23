import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AddBook = () => {
  const { currentUser } = useSelector((state) => state.booklistuser);
  const [bookData, setBookData] = useState({
    title: "",
    desc: "",
    publisher: "",
    author: "",
    isbn: "",
    userid: currentUser._id,
  });
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

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
      const res = await axios.post(
        "https://booklist-backend-q6e3.onrender.com/api/books/add",
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
      
        <h2 className="register_title main-add-book-title">Add Book</h2>
        <input
          placeholder="Title of the Book"
          className="register_username__input"
          type="text"
          onChange={(e) => {
            setBookData({ ...bookData, title: e.target.value });
          }}
        />
        <input
          placeholder="ISBN"
          className="register_password__input"
          type="text"
          onChange={(e) => {
            setBookData({ ...bookData, isbn: e.target.value });
          }}
        />
        <input
          placeholder="Author"
          className="register_confirm_password__input"
          type="text"
          onChange={(e) => {
            setBookData({ ...bookData, author: e.target.value });
          }}
        />
        <input
          placeholder="Describe this Book"
          className="register_password__input"
          type="text"
          onChange={(e) => {
            setBookData({ ...bookData, desc: e.target.value });
          }}
        />

        <input
          placeholder="Publisher of this Book"
          className="register_password__input"
          type="text"
          onChange={(e) => {
            setBookData({ ...bookData, publisher: e.target.value });
          }}
        />
        <button
          className="register_button"
          onClick={() => formHandler(bookData)}
        >
          Submit
        </button>
        {error && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>
    </div>
  );
};

export default AddBook;
