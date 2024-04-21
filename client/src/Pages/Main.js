import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterParty from "./RegisterParty";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Login from "./Login";
import AddCase from "./AddCase";
import RegisterLawyer from "./RegisterLawyer";
import Room from "./Room";
// import WrappedNormalRegisterLawyerForm from "./RegisterLawyer";
import RegisterJudge from "./RegisterJudge";
import Error from "./Error";
import { Welcome } from "../components";
const Main = (props) => {
  console.log("propss passable", props.passableItems);
  console.log("propsss ", props);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="home" element={<Layout props={props} />} />
        {/* <Route
          path="/"
          element={
            <Login passableItems={props.passableItems} user={props.user} />
          }
        /> */}
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
          path="/"
          element={<Welcome passableItems={props.passableItems} />}
        />
        <Route path="*" element={<Error />} />
        <Route
          path="/home/:caseId"
          element={<Room />}
          passableItems={props.passableItems}
        />
      </Routes>
    </>
  );
};

const NoMatch = () => {
  return <div>Url Not Found</div>;
};

export default Main;
