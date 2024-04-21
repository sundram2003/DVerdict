import React, { useState } from "react";
import { createIdentity } from "eth-crypto";
const Register = ({ passableItems }) => {
  const [loading, setLoading] = useState(false);
  const [judgeId, setJudgeId] = useState("");
  const { publicKey, privateKey } = createIdentity();
  console.log("publicKey", publicKey);
  console.log("passableItems", passableItems);
  const registerJudge = async (name, phone, email, address, pubkey) => {
    try {
      const { account, court, GAS, GAS_PRICE } = passableItems;
      console.log("register judge in court", court);
      // Call the contract method to register the lawyer
      console.log("Calling register judge method...");
      const result = await court.methods
        .registerJudge(name, phone, email, address, pubkey)
        .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });

      // Log the result
      console.log("Registration result:", result);

      // Get the lawyer ID from the event
      getValue(court);
    } catch (error) {
      console.error("Error registering lawyer:", error);
    }
  };
  let num;
  const getValue = async (court) => {
    try {
      console.log("Getting judge ID...");
      var events = await court?.events
        ?.judgeRegistered({ fromBlock: 0 })
        ?.on("data", (event) => {
          num = event?.returnValues?._judgeId;
          setJudgeId(String(num));
          console.log("Judge ID set:", event?.returnValues?._judgeId);
        })
        ?.on("changed", (event) => {
          console.log("NEWWW", event);
        })
        ?.on("error", console.error);
      console.log("Events:", events);
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
      downloadPrivateKey(person.privateKey);
      console.log("form data", (name, phone, email, address, pubk));
      setLoading(false);
      // downloadPrivateKey(person.privateKey);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // Handle error notification or display
    }
  };
  // Download private key logic
  const downloadPrivateKey = (_blobData) => {
    var blob = new Blob([_blobData + "\n" + "keep this key saved"], {
      type: "text/plain",
    });
    let url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display:none";
    a.href = url;
    a.download = "private_key";
    a.click();
    document.body.removeChild(a);
  };
  const judgeIdd = Number(judgeId);
  console.log("judgeId", judgeIdd);
  return (
    <>
      <div className="flex justify-center min-h-screen items-center  bg-slate-950">
        <div className="p-8  bg-slate-800 max-w-md mx-auto  rounded-xl mt-4  shadow-slate-600 shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-teal-50">
            Register Judge
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="block w-full p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="block w-full p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              className="block w-full p-2 border border-gray-400 rounded"
            />
            <input
              type="text"
              cursor="not-allowed"
              placeholder={`Eth address: ${passableItems.account}`}
              disabled
              style={{ cursor: "not-allowed" }}
              className="block w-full p-2 border border-gray-400 rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded"
            >
              {loading ? "Processing..." : "Proceed to Add the user"}
            </button>
          </form>
          {loading && <p className="mt-4 text-center">Loading...</p>}
          {judgeId && (
            <h3 className="mt-4 text-center text-white">
              Your Judge Id is: {judgeIdd}
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
