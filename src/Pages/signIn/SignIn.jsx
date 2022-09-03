import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign.css";
import axios from "axios";
export const SignIn = () => {
  const [state, setState] = useState({
    emailId: "",
    password: "",
  });
  const [error, setError] = useState({
    emailId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(state);
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("first", state?.emailId);
    if (state?.emailId === "") {
      setError({ emailId: "Please enter valid email !" });
    }
    if (state?.password === "") {
      setError((prevState) => ({
        ...prevState,
        password: "Please enter valid password !",
      }));
    }
    if (state.emailId != "" && state.password != "") {
      setError({ emailId: "", password: "" });
      console.log("seconf");
      let loginData = state?.emailId + state?.password;
      await axios
        .get(`http://localhost:3005/loginData/${loginData}`)
        .then((data) => {
          console.log("Data", data);
          if (data?.data.hasOwnProperty("id")) {
              console.log("data?.data", data?.data)
            localStorage.setItem("userData", JSON.stringify(data?.data));
            navigate("/user/dashboard");
          }
        });
    }
    // navigate('/user/dashboard')
  };
  return (
    <div className="loginPage">
      <div className="login">
        <h4>Sign In</h4>
        <h6>Please enter the below details to sign in to account</h6>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="emailId"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          {error?.emailId ? (
            <div className="text-danger">{error?.emailId}</div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange}
            />
          </div>
          {error?.password ? (
            <div className="text-danger">{error?.password}</div>
          ) : (
            ""
          )}
          <div className="mb-3">
            Don't have an accoutn ?<Link to="/signup"> SignUp</Link>
          </div>
          <button type="submit" className="btn btn-primary" onClick={login}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
