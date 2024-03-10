import React from "react";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Weather from "./components/Weather";

const App = () => {
  const routes = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/weather',
      element: <Weather />
    }
  ]
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map(({path,element}, key) => (<Route path={path} element={element} key={key} />))}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
