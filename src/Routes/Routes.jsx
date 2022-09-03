import { useRoutes } from "react-router-dom";
import { AuthLayOut } from "../Authenticate/AuthLayOut";
import { MainLayout } from "../Authenticate/MainLayout";
import { SignIn } from "../Pages/signIn/SignIn";
import { DashBoard } from "../Pages/dashboard/DashBoard";
import { SignUp } from "../Pages/signUp/SignUp";

const RoutesCom = () => {
  let routes = useRoutes([
    {
      path: "",
      element: <AuthLayOut />,
      children: [
        { path: "login", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "user",
      element: <MainLayout />,
      children: [{ path: "dashboard", element: <DashBoard /> }],
    },
  ]);

  return routes;
};

export default RoutesCom;
