import React, { useState } from 'react'
import {login} from "../redux/apiCalls"
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginFormData,setLoginFormData] = useState({
    username:"",
    password:""
  })
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.booklistuser);

  const loginFormHandler = async (formData) =>{
    login(dispatch,{username:formData.username,password:formData.password})
  }

  return (
    <div className="login">
      <div className="register_main-div">
        <h2 className="register_title">Login</h2>
        <input
          placeholder="Username"
          className="register_username__input"
          type="text"
          onChange={(e) => {
            setLoginFormData({ ...loginFormData, username: e.target.value });
          }}
        />
        <input
          placeholder="Password"
          className="register_password__input"
          type="password"
          onChange={(e) => {
            setLoginFormData({ ...loginFormData, password: e.target.value });
          }}
        />
        <button className="login_button" onClick={()=>loginFormHandler(loginFormData)} disabled={isFetching}>LOGIN</button>
        <Link
            to="/register"
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        {error && <div style={{ color: "red" }}>Something went wrong</div>}
      </div>
    </div>
  )
}

export default Login