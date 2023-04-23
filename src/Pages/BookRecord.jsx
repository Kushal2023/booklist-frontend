import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

const BookRecord = () => {
  const location = useLocation();
  const book = location.state?.bookData;
  const { currentUser } = useSelector((state) => state.booklistuser);
  const navigate = useNavigate();
  console.log(book);

  const handleDelete = async (bookId) => {
    const res = await axios.delete(
      `https://booklist-backend-q6e3.onrender.com/api/books/delete/${bookId}`,
      { headers: { token: "Bearer " + currentUser.accesstoken } }
    );

    res.data && navigate("/")
  }

  return (
    <div className="book-record">
      <div className="book-record-main-div">
        <Link to="/">
          <button className="logout-button" style={{ margin: "0 auto" }}>
            Show Book List
          </button>
        </Link>
        <h2 className="book-record_title">Book Record</h2>
        <div className="title">
          <p>Title</p>
          <p>{book.title}</p>
        </div>
        <div className="desc">
          <p>Author</p>
          <p>{book.author}</p>
        </div>
        <div className="author">
          <p>ISBN</p>
          <p>{book.isbn}</p>
        </div>
        <div className="isbn">
          <p>Publisher</p>
          <p>{book.publisher}</p>
        </div>
        <div className="publisher">
          <p>Description</p>
          <p>{book.desc}</p>
        </div>
        <div className="buttons">
          <button
            className="book-record-delete"
            onClick={() => handleDelete(book._id)}
          >
            Delete Book
          </button>
          <Link to="/edit-book" state={{bookData:book}}>
          <button className="book-record-edit">Edit Book</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default BookRecord;
