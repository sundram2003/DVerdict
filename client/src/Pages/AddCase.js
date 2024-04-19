import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCase = ({ passableItems }) => {
  const [auth, setAuth] = useState(false);
  const [lawyerId, setLawyerId] = useState("");
  const { court, GAS, GAS_PRICE } = passableItems;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { account } = passableItems;
        const owner = await court.methods.owner().call();
        if (owner === account) {
          setAuth(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [court, passableItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Adding case...");
    try {
      const formData = new FormData(e.target);
      const JudgeId = formData.get("JudgeId");
      const Lawyer1Id = formData.get("Lawyer1Id");
      const Lawyer2Id = formData.get("Lawyer2Id");
      const Party1 = formData.get("Party1");
      const Party2 = formData.get("Party2");
      const Details = formData.get("Details");

      await court.methods
        .newCase(JudgeId, Lawyer1Id, Lawyer2Id, Party1, Party2, Details)
        .send({ from: passableItems.account, gas: GAS, gasPrice: GAS_PRICE });
      toast.success("Case added successfully!");
      const events = await court.events
        .caseCreated({ fromBlock: 0 })
        .on("data", (event) => {
          setLawyerId(event.returnValues._caseId);
        });
    } catch (error) {
      console.error("Error adding case:", error);
      toast.error("Failed to add case. Please try again.");
    }
  };

  return true ? (
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
          Your Case Id is: {lawyerId}
        </h3>
      </form>
    </div>
  ) : (
    <h1 className="text-center mt-8">YOU ARE NOT AN ADMIN</h1>
  );
};

export default AddCase;
