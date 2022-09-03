import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayOut = () => {
  let auth = JSON.parse(localStorage.getItem("userData"))?.id;
  console.log("auth", auth )
  let navigate = useNavigate();
  useEffect(() => {
    if (!auth) navigate("/login");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
