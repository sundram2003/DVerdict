import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterParty from "./RegisterParty";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Login from "./Login";
import AddCase from "./AddCase";
import RegisterLawyer from "./RegisterLawyer";
// import WrappedNormalRegisterLawyerForm from "./RegisterLawyer";
import RegisterJudge from "./RegisterJudge";
import Error from "./Error";
const Main = (props) => {
  console.log("propss", props.passableItems);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="login"
          element={
            <Login passableItems={props.passableItems} user={props.user} />
          }
        />
        <Route
          path="add-case"
          element={<AddCase passableItems={props.passableItems} />}
        />
        <Route
          path="register-lawyer"
          element={<RegisterLawyer passableItems={props.passableItems} />}
        />
        <Route
          path="register-judge"
          element={<RegisterJudge passableItems={props.passableItems} />}
        />
        <Route
          path="register-user"
          element={<RegisterParty passableItems={props.passableItems} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

const NoMatch = () => {
  return <div>Url Not Found</div>;
};

export default Main;
