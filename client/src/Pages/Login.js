import React, { useState } from "react";
import { IconContext } from "react-icons";
import { MdPerson, MdLock } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = ({ passableItems, user }) => {
  console.log("passableItems: ", passableItems, user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Received case number: ", caseNumber);
      const user = await loginUser(caseNumber);
      setLoading(false);
      navigate("/", { state: { user, caseId: caseNumber } });
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      // Handle error notification or display
    }
  };

  const loginUser = async (caseId) => {
    const { account, court } = passableItems;
    let owner, judge, lawyer1, lawyer2;
    try {
      owner = await court.methods.owner().call();
      const result = await court.methods.getCaseAddresses(caseId).call();
      judge = result.judge;
      lawyer1 = result.lawyer1;
      lawyer2 = result.lawyer2;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }

    if (account === owner) {
      console.log("this is owner");
      return 2;
    } else if ([judge, lawyer1, lawyer2].includes(account)) {
      console.log("user can view");
      return 3;
    } else {
      console.log("user not auth");
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
