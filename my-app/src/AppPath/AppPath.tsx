import { Navigate, useRoutes } from "react-router-dom";
import Favourites from "../page/Favourites/Favourites";
import Home from "../page/Home/Home";

const AppPath = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/favourites", element: <Favourites /> },
    { path: "*", element: <Navigate to="/" /> },
  ]);
};

export default AppPath;
