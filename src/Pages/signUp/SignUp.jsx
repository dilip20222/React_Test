import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sign.css";
import axios from "axios";

export const SignUp = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    password: "",
    Email: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    password: "",
    Email: "",
    dublicErr: "",
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (state?.Email === "") {
      setError({ emailId: "Please enter valid email !" });
    }
    if (state?.firstName === "") {
      setError((prevState) => ({
        ...prevState,
        firstName: "Please enter valid firstName !",
      }));
    }
    if (state?.Email === "") {
      setError((prevState) => ({
        ...prevState,
        Email: "Please enter valid Email !",
      }));
    }
    if (state?.lastName === "") {
      setError((prevState) => ({
        ...prevState,
        lastName: "Please enter valid lastName !",
      }));
    }
    if (state?.password === "") {
      setError((prevState) => ({
        ...prevState,
        password: "Please enter valid password !",
      }));
    }
    if (
      state?.Email &&
      state?.firstName &&
      state?.lastName &&
      state?.password
    ) {
      setError({ firstName: "", lastName: "", password: "", Email: "" });
      await axios
        .post("http://localhost:3005/loginData", {
          firstName: state?.Email,
          lastName: state?.lastName,
          password: state?.password,
          id: state?.Email + state.password,
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data?.data));
          navigate("/user/dashboard");
        })
        .catch(() => {
          setError({ dublicErr: "Email ID already Exists" });
        });
    }
  };
  return (
    <div className="loginPage">
      <div className="login">
        <h4>Sign Up</h4>
        <h6>Please enter the below details to sign in to account</h6>
        {error?.dublicErr ? (
          <div className="text-danger">{error?.dublicErr}</div>
        ) : (
          ""
        )}
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              FirstName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="firstName"
              aria-describedby="emailHelp"
              onCanPlay={handleChange}
              value={state?.firstName}
              onChange={handleChange}
            />
          </div>
          {error?.firstName ? (
            <div className="text-danger">{error?.firstName}</div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              LastName
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange}
              value={state?.lastName}
              onChange={handleChange}
            />
          </div>
          {error?.lastName ? (
            <div className="text-danger">{error?.lastName}</div>
          ) : (
            ""
          )}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="Email"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChange}
              value={state?.Email}
              onChange={handleChange}
            />
          </div>
          {error?.Email ? (
            <div className="text-danger">{error?.Email}</div>
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
              value={state?.password}
              onChange={handleChange}
            />
          </div>
          {error?.password ? (
            <div className="text-danger">{error?.password}</div>
          ) : (
            ""
          )}
          <div className="mb-3">
            Don't have an accoutn ?<Link to="/login"> SignIn</Link>
          </div>
          <button type="submit" className="btn btn-primary" onClick={signUp}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
