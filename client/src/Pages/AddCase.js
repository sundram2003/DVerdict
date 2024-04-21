import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCase = ({ passableItems }) => {
  const [auth, setAuth] = useState(false);

  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState("");
  // const [error, setError] = useState(false);
  const newCase = async (
    judgeId,
    lawyer1Id,
    lawyer2Id,
    party1name,
    party2name,
    details
  ) => {
    console.log(
      "infooo",
      judgeId,
      lawyer1Id,
      lawyer2Id,
      party1name,
      party2name,
      details
    );
    try {
      const { account, court, GAS, GAS_PRICE } = passableItems;
      // setLoading(true);
      console.log("inside add case ", passableItems);
      console.log("judgeId", judgeId);
      console.log("lawyer1Id", lawyer1Id);
      console.log("lawer2Id", lawyer2Id);
      console.log("party1Id", party1name);
      console.log("party2Id", party2name);
      console.log("details", details);
      // const r = await court;
      console.log("before jjust resultttttttttttt");
      const result = await court?.methods
        ?.newCase(
          judgeId,
          lawyer1Id,
          lawyer2Id,
          party1name,
          party2name,
          details
        )
        ?.send({ from: account, gas: GAS, gasPrice: GAS_PRICE });
      console.log("New case resultttttttttttt:", result);
      // setLoading(false);
      getValue(court);
    } catch (error) {
      console.error("Error creating new case:", error);
      setLoading(false);
    }
  };
  let num;

  const getValue = async (court) => {
    try {
      const events = await court?.events
        ?.caseCreated({ fromBlock: 0 })
        ?.on("data", (event) => {
          num = event?.returnValues?._caseId;
          console.log("CaseID set:", event?.returnValues?._caseId);
          setCaseId(String(num));
        })
        ?.on("changed", (event) => {
          console.log("NEWWW", event);
        })
        ?.on("error", (error) => {
          console.error("Error fetching case ID:", error);
        });
    } catch (error) {
      console.error("Error fetching case ID:", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log("eventt", e);
    e.preventDefault();
    setLoading(true);
    const { judgeId, lawyer1Id, lawyer2Id, party1name, party2name, details } =
      e.target.elements;
    try {
      await newCase(
        judgeId?.value,
        lawyer1Id?.value,
        lawyer2Id?.value,
        party1name?.value,
        party2name?.value,
        details?.value
      );

      console.log("inside the newcase handle sumbitadd case ", passableItems);
      console.log("judgeId", judgeId?.value);
      console.log("lawyer1Id", lawyer1Id?.value);
      console.log("lawer2Id", lawyer2Id?.value);
      console.log("party1name", party1name?.value);
      console.log("party2name", party2name?.value);
      console.log("details", details?.value);
    } catch (error) {
      console.error("Error adding new case:", error);
      toast.error("Failed to add case. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { account, court } = passableItems;
      console.log("passableee items in add case", passableItems);
      const owner = await court?.methods?.owner()?.call();
      console.log("owner of page", owner);
      console.log("account of page", account);
      if (owner === account) {
        // If the current account is the owner, set auth to true
        setAuth(true);
        console.log("Authenticated as owner");
      }
    } catch (error) {
      toast.error("Failed to authenticate. Only of admin.");
      console.error("Error checking authentication:", error);
    }
  };

  const caseIdd = Number(caseId);
  console.log("caseID", caseIdd);
  return auth ? (
    <div className="flex justify-center items-center h-screen  bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 shadow-slate-200 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Judge Id"
            name="judgeId"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lawyer 1 Id"
            name="lawyer1Id"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lawyer 2 Id"
            name="lawyer2Id"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Culprit Name"
            name="party1name"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Victim Name"
            name="party2name"
            className="border rounded w-full py-2 px-3 bg-white"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Details"
            name="details"
            className="border rounded w-full py-2 px-3 bg-white"
          />
        </div>

        {/* Add other form fields */}
        <div className="mb-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Proceed to Add the case
          </button>
        </div>
        {loading && <p className=" mt-4 text-center">Loading...</p>}
        {caseId && (
          <h3 className="text-center text-white">Your Case Id is: {caseIdd}</h3>
        )}
        {/* <h3 className="hidden mt-3 text-white">Your Case Id is: {caseIdd}</h3> */}
      </form>
    </div>
  ) : (
    <h1 className="text-center  h-screen  bg-slate-950 bg-slate-950mt-8 text-white font-extrabold">
      YOU ARE NOT AN ADMIN
    </h1>
  );
};

export default AddCase;
