import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainNav } from "../Components/MainNav";

export const MainLayout = () => {
  let auth = JSON.parse(localStorage.getItem("userData"))?.id   ;
  let navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/user/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
};
