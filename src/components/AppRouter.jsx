import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { AuthContext } from "../context";
import Loader from "../UI/Loader/Loader";

const AppRouter = () => {

  const {isAuth, isLoading} = useContext(AuthContext)

  if (isLoading) {
    return <Loader/>
  }

  const fallbackRoute = isAuth ? (
    <Navigate to="/posts" replace />
  ) : (
    <Navigate to="/login" replace />
  );

  return (
    <Routes>
      {isAuth
        ? privateRoutes.map((route) => (
            <Route
              key={route.path}
              element={<route.element />}
              path={route.path}
              exact={route.exact}
            />
          ))
        : publicRoutes.map((route) => (
            <Route
              key={route.path}
              element={<route.element />}
              path={route.path}
              exact={route.exact}
            />
          ))}
      <Route path="*" element={fallbackRoute} />
    </Routes>
  );
};

export default AppRouter;


