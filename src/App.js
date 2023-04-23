import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register"
import Login from "./Pages/Login";
import Homepage from "./Pages/Homepage";
import { useSelector } from "react-redux";
import AddBook from "./Pages/AddBook";
import BookRecord from "./Pages/BookRecord";
import EditBook from "./Pages/EditBook";

function App() {
  const { currentUser } = useSelector((state) => state.booklistuser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser?<Homepage/>:<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-book" element={<AddBook/>}/>
        <Route path="/book-record" element={<BookRecord/>}/>
        <Route path="/edit-book" element={<EditBook/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
