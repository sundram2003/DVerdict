import React, { useState } from "react";
import { IconContext } from "react-icons";
import { MdPerson, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = ({ passableItems, user }) => {
  const [caseNumber, setCaseNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log("passable items ", passableItems);
  console.log("userrrrr", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await loginUser(caseNumber);
      console.log("user and caseId", result, caseNumber);
      localStorage.setItem("user", result);
      localStorage.setItem("caseId", caseNumber);
      navigate("/home", {
        user: result,
        caseId: caseNumber,
        court: passableItems.court,
      });
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, show error message, etc.
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (caseId) => {
    const { account, court } = passableItems;
    let owner, judge, lawyer1, lawyer2;
    console.log("caseId", account, caseId);
    console.log("Courtt inside lofin user", court);
    try {
      owner = await court?.methods?.owner()?.call();
      console.log("Response inside loginuser", owner);
    } catch (error) {
      console.error("Error fetching owner:", error);
      // Handle error, show error message, etc.
    }

    await court.methods.getCaseAddresses(caseId).call((e, r) => {
      if (!e) {
        judge = r.judge;
        lawyer1 = r.lawyer1;
        lawyer2 = r.lawyer2;
      } else {
        console.error("Error fetching case addresses:", e);
      }
    });
    console.log(
      "accounts owner judge lawyer1 law2",
      account,
      owner,
      judge,
      lawyer1,
      lawyer2
    );
    if (account === owner) {
      return 2;
    } else if (
      account === judge ||
      account === lawyer1 ||
      account === lawyer2
    ) {
      return 3;
    } else {
      return 4;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <IconContext.Provider value={{ size: "1.5em", className: "mr-2" }}>
            <MdPerson />
          </IconContext.Provider>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            placeholder="Case Number"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <IconContext.Provider value={{ size: "1.5em", className: "mr-2" }}>
            <MdLock />
          </IconContext.Provider>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Proceed to Login with MetaMask
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
