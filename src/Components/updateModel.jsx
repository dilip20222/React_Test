import React from "react";
import { useState } from "react";
import "./updateModel.css";
import axios from "axios";

export const UpdateModel = ({ data, closeModel, getUserData }) => {
  const [input, setInput] = useState({
    email: data?.email,
    gender: data?.gender,
    name: data?.name,
    status: data?.status,
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateEle = async (e) => {
    e.preventDefault();
    if (data) {
      await axios
        .patch(`http://localhost:3005/AuthUser/${data?.id}`, input)
        .then(() => {
          getUserData();
          closeModel();
        });
    } else {
      await axios.post(`http://localhost:3005/AuthUser`, input).then(() => {
        getUserData();
        closeModel();
      });
    }
  };

  const cancleModel = () => {
    closeModel();
  };
  return (
    <div className="show">
      <div className="head">
        <h3>Edit User Information</h3>
      </div>
      <form action="" className="updateForm">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          className="nameInput"
          placeholder="Enter you firstName"
          width="170px"
          value={input?.name || ""}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your Email ID"
          className="emailInput"
          name="email"
          value={input?.email || ""}
          onChange={handleChange}
        />
        <div>
          <label htmlFor="gender">Gender :-&nbsp;&nbsp;</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio1"
              defaultValue="male"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="inlineRadio2"
              defaultValue="female"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              female
            </label>
          </div>
        </div>
        <label htmlFor="status">Status: &nbsp;</label>

        <select
          id="status"
          name="status"
          onChange={handleChange}
          value={input?.status}
        >
          <option value="inactive">inactive</option>
          <option value="active">active</option>
        </select>

        <br />
        <div className="formBtn">
          <button className="btn btn-danger m-1" onClick={updateEle}>
            Submit
          </button>
          <button className="btn btn-dark m-1" onClick={cancleModel}>
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
};
