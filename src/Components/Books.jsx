import React from "react";
import { Link } from "react-router-dom";

const Books = ({book}) => {
  return (
    <Link to="/book-record" state={{bookData:book}}>
    <div className="book">
      <img
        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        className="book-image"
        alt="book-img"
      />
      <div className="description">
        <p className="book-title">{book.title}</p>
        <p className="book-author">{book.author}</p>
        <p className="book-genre">{book.desc}</p>
      </div>
    </div>
    </Link>
  );
};

export default Books;
