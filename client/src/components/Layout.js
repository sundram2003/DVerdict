import React, { useState, useEffect } from "react";
import "../App.css";
import { Image, Table, Button, Input, Form } from "semantic-ui-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TableList from "./TableList";
import Instance from "../middleware/web3";
import ShowModal from "../Pages/modal";
import FileUploads from "./FileUploads";
import Display from "./Display";
const Layout = ({ props }) => {
  // const [user, setUser] = useState(4);
  const location = useLocation();
  const caseId = localStorage.getItem("caseId");
  console.log("caseId", caseId);
  const [accountId, setAccountId] = useState("");
  const [user, setUser] = useState("");
  console.log("propss in layout", props);
  console.log("user in layout", user);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let acc = await Instance.web3.eth.getAccounts();
        setAccountId(acc[0]);
        console.log("window", window);
        setUser(user);
        if (!window.location) {
          setUser(4);
        } else {
          setUser(window?.location?.state?.user);
          console.log("user", window.location);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [location]);
  const clickhandler = () => {
    navigate(`/home/${caseId}`, {
      // user: user,
      caseId: accountId,
      court: props.court,
    });
  };

  return (
    <div className="bg-gray-white min-h-screen bg-gray-900">
      <FileUploads props={props.passableItems} />
      <button
        onClick={clickhandler}
        className="bg-blue-500 hover:bg-blue-700 mb-2 ml-4 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Join Hearing
      </button>
      <br />
      <Display props={props.passableItems} />
    </div>
  );
};

export default Layout;
