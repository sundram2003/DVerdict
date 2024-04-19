import React, { useState } from "react";
import { createIdentity } from "eth-crypto";
const Register = ({ passableItems }) => {
  const [loading, setLoading] = useState(false);
  const [judgeId, setJudgeId] = useState("");
  const { publicKey, privateKey } = createIdentity();
  console.log("publicKey", publicKey);
  console.log("passableItems", passableItems);
  // const registerJudge = async (name, phone, email, address, pubkey) => {
  //   const { account, court, GAS, GAS_PRICE } = passableItems;
  //   console.log(court);
  //   const p = createIdentity();
  //   console.log("Printing identity: ", p);
  //   await court.methods
  //     .registerJudge(name, phone, email, address, pubkey)
  //     .send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
  //     .then((r) => {
  //       console.log("result after judge registered", r);
  //       setJudgeId(r.judgeId);
  //       setLoading(false);
  //     });
  // };
  const registerJudge = async (name, phone, email, address, pubkey, p) => {
    const { account, court, GAS, GAS_PRICE } = p;
    console.log(court);
    try {
      const response = await court.methods
        .registerJudge(name, phone, email, address, pubkey)
        .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });
      console.log(response);
      setLoading(false);
      getValue(court);
    } catch (error) {
      console.error(error);
    }
  };
  const getValue = async (court) => {
    try {
      court.events
        .judgeRegistered({ fromBlock: 0 })
        .on("data", (event) => {
          // setLawyerId(event.returnValues._judgeId);
        })
        .on("changed", (event) => {
          console.log("NEWWW", event);
        })
        .on("error", console.error);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    console.log("Inside handle of register judge", e.target.elements);
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form submitted");
      const person = {
        publicKey: publicKey,
        privateKey: privateKey,
      };
      //   console.log("add public key to contract", person.publicKey);
      var name = e.target.elements.name.value;
      var email = e.target.elements.email.value;
      var phone = e.target.elements.phone.value;
      var address = passableItems.account;
      var pubk = person.publicKey;
      registerJudge(name, phone, email, address, pubk);
      console.log(
        "form data",
        registerJudge(name, phone, email, address, pubk)
      );
      // Download private key logic
      // downloadPrivateKey(person.privateKey);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // Handle error notification or display
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Register Judge</h1>
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
          cursor="not-allowed"
          placeholder={`Eth address: ${passableItems.account}`}
          disabled
          style={{ cursor: "not-allowed" }}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Processing..." : "Proceed to Add the user"}
        </button>
      </form>
      {loading && <p className="mt-4 text-center">Loading...</p>}
      {judgeId && (
        <h3 className="mt-4 text-center">Your Judge Id is: {judgeId}</h3>
      )}
    </div>
  );
};

export default Register;
