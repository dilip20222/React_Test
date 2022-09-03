import React from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";

export const MainNav = () => {
  const navigate = useNavigate();
  let name = JSON.parse(localStorage.getItem("userData"))?.firstName;
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="nav-bar">
      <div> Logo</div>
      <div className="right-nav">
        <h3 className="text-white">{name ? name : ""}</h3>
        <button className="btn-primary" onClick={logOut}>
          logout
        </button>
      </div>
    </div>
  );
};
