import React, { useState } from "react";
import { createIdentity } from "eth-crypto";
const Register = ({ passableItems }) => {
  const [loading, setLoading] = useState(false);
  const [lawyerId, setLawyerId] = useState("");
  const { publicKey, privateKey } = createIdentity();
  console.log("passableItems", passableItems);

  const registerLawyer = async (name, phone, email, address, pubkey) => {
    const { account, court, GAS, GAS_PRICE } = passableItems;
    console.log(court);
    try {
      const response = await court._methods
        .registerLawyer(name, phone, email, address, pubkey)
        .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });
      console.log("response in lawyer registered", response);
      console.log("lawerId", lawyerId);
      setLoading(false);
      getValue(court); // Call getValue to update lawyerId after successful registration
      // const lawyerId = response.events.lawyerRegistered.returnValues._lawyerId; // Assuming _lawyerId is the correct return value
      setLawyerId(lawyerId);
    } catch (error) {
      console.error(error);
    }
  };
  const getValue = async (court) => {
    console.log("courttt in getValye", court);
    if (!court || !court._events || !court._events.lawyerRegistered) {
      console.error("Court or its properties are undefined");
      return;
    }
    let events = await court?.events
      ?.lawyerRegistered({ fromBlock: 0 })
      ?.on("data", (event) => {
        this.setState({ lawyerId: event.returnValues._lawyerId });
      })
      ?.on("changed", function (event) {
        console.log("NEWWW", event);
      })
      ?.on("error", console.error);
    console.log("events", events);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const person = {
        publicKey: publicKey,
        privateKey: privateKey,
      };
      console.log("e", e.target.elements);
      const name = e.target.elements.name.value;
      const email = e.target.elements.email.value;
      const phone = e.target.elements.phone.value;
      const address = passableItems.account;
      const pubkey = person.publicKey; // Replace with actual public key logic
      registerLawyer(name, phone, email, address, pubkey);
      console.log("ress", name, email, phone, address, pubkey);
      // Download private key logic
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // Handle error notification or display
    }
  };
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Register Lawyer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder={`Eth address: ${passableItems.account}`}
          disabled
          className="block w-full p-2 border border-gray-300 rounded bg-gray-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="block w-full p-2 bg-blue-500 text-white font-semibold rounded"
        >
          {loading ? "Processing..." : "Proceed to Add the user"}
        </button>
      </form>
      {loading && <p className="text-center">Loading...</p>}
      {lawyerId && (
        <h3 className="text-center">Your Lawyer Id is: {lawyerId}</h3>
      )}
    </div>
  );
};

export default Register;
