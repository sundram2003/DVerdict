import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components";
import Container from "./container/dapp";

const App = () => (
  <div className="flex flex-col min-h-screen">
    {/* <Navbar /> */}
    <Container />
    <Footer />
  </div>
);

export default App;
