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
      console.log("party1name", party1name);
      console.log("party2name", party2name);
      console.log("details", details);
      // const r = await court;
      // console.log("before jjust", r);
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
      console.log("New case result:", result);
      // setLoading(false);
      getValue(court);
    } catch (error) {
      console.error("Error creating new case:", error);
      setLoading(false);
    }
  };

  const getValue = async (court) => {
    try {
      const events = await court?.events
        ?.caseCreated({ fromBlock: 0 })
        ?.on("data", (event) => {
          setCaseId(event?.returnValues?._caseId);
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
    e.preventDefault();
    // setLoading(true);
    const { JudgeId, Lawyer1Id, Lawyer2Id, Party1, Party2, Details } =
      e.target.elements;

    // Check if any of the form fields are empty
    if (
      !JudgeId.value ||
      !Lawyer1Id.value ||
      !Lawyer2Id.value ||
      !Party1.value ||
      !Party2.value ||
      !Details.value
    ) {
      alert("All fields are mandatory");
      return;
    }

    // Set loading state to true
    setLoading(true);

    try {
      // const p = passableItems;
      await newCase(
        JudgeId.value,
        Lawyer1Id.value,
        Lawyer2Id.value,
        Party1.value,
        Party2.value,
        Details.value
      );
      // Reset form fields
      // JudgeId.value = "";
      // Lawyer1Id.value = "";
      // Lawyer2Id.value = "";
      // Party1.value = "";
      // Party2.value = "";
      // Details.value = "";
      console.log("inside the newcase handle sumbitadd case ", passableItems);
      console.log("judgeId", JudgeId.value);
      console.log("lawyer1Id", Lawyer1Id.value);
      console.log("lawer2Id", Lawyer2Id.value);
      console.log("party1name", Party1.value);
      console.log("party2name", Party2.value);
      console.log("details", Details.value);
      setLoading(false);
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
      const owner = await court?.methods?.owner().call();
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

  return auth ? (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Judge Id"
            name="JudgeId"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lawyer 1 Id"
            name="Lawyer1Id"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Lawyer 2 Id"
            name="Lawyer2Id"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Party 1"
            name="Party1"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Party 2"
            name="Party2"
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Details"
            name="Details"
            className="border rounded w-full py-2 px-3"
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
        <h3 id="lawyerId" className="hidden">
          Your Case Id is: {caseId}
        </h3>
      </form>
    </div>
  ) : (
    <h1 className="text-center mt-8">YOU ARE NOT AN ADMIN</h1>
  );
};

export default AddCase;
