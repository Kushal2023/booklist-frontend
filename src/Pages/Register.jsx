import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const formHandler = async (formData) => {
    if (formData.username === "" || formData.password === "") {
      setError(true);
      setErrorMsg("Please fill all the field");
    } else if (formData.password !== confirmPassword) {
      setError(true);
      setErrorMsg("Password and confirm password should be same");
    } else {
      try {
        const res = await axios.post("https://booklist-backend-q6e3.onrender.com/api/users/register", {
          username: formData.username,
          password: formData.password,
        });

        res.data && navigate("/login")
      } catch (err) {
        setError(true);
        setErrorMsg("Username is already present");
      }
    }
  };

  return (
    <div className="register">
      <div className="register_main-div">
        <h2 className="register_title">Register</h2>
        <input
          placeholder="Username"
          className="register_username__input"
          type="text"
          onChange={(e) => {
            setRegisterData({ ...registerData, username: e.target.value });
          }}
        />
        <input
          placeholder="Password"
          className="register_password__input"
          type="password"
          onChange={(e) => {
            setRegisterData({ ...registerData, password: e.target.value });
          }}
        />
        <input
          placeholder="Confirm Password"
          className="register_confirm_password__input"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="register_button"
          onClick={() => formHandler(registerData)}
        >
          REGISTER
        </button>
        <Link
            to="/login"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        {error && <div style={{ color: "red" }}>{errorMsg}</div>}
      </div>
    </div>
  );
};

export default Register;
