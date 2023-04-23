import React, { useEffect, useState } from "react";
import Books from "../Components/Books";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/apiCalls";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.booklistuser);
  const [bookList, setBookList] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getBookList = async () => {
      setLoading(true)
      const res = await axios.get(
        `https://booklist-backend-q6e3.onrender.com/api/books/get-all/${currentUser._id}`,
        { headers: { token: "Bearer " + currentUser.accesstoken } }
      );
      setLoading(false)
      setBookList(res.data);
    };
    getBookList();
  }, [currentUser]);

 

  console.log(bookList);

  return (
    <div className="homepage">
      <div className="homepage_main-div">
        <h2 className="homepage_title">Books List</h2>
        <button className="logout-button" onClick={() => Logout(dispatch)}>
          Logout
        </button>
        <div className="books-div">
          <Link to="/add-book">
          <button className="add-new-button">Add New Book</button>
          </Link>
          
          <div className="books">
          {loading && <div style={{ color: "white" }}>loading...</div>}
            {bookList.map((book,index) => (
              <Books book={book} key={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
