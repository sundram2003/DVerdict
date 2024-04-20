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
      const response = await court.methods
        .registerLawyer(name, phone, email, address, pubkey)
        .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });
      console.log("response in lawyer registered", response);
      console.log("lawerId", lawyerId);

      getValue(court); // Call getValue to update lawyerId after successful registration
      // const lawyerId = response.events.lawyerRegistered.returnValues._lawyerId; // Assuming _lawyerId is the correct return value
      // setLawyerId(lawyerId);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  let num;
  const getValue = async (court) => {
    // try {
    //   console.log("Getting judge ID...");
    //   var events = await court?.events
    //     ?.lawyerRegistered({ fromBlock: 0 })
    //     ?.on("data", (event) => {
    //       num = event?.returnValues?._lawyerId;
    //       if (num) setLawyerId(String(num));
    //       console.log("Lawyer ID set:", event?.returnValues?._lawyerId);
    //     })
    //     ?.on("changed", (event) => {
    //       console.log("NEWWW", event);
    //     })
    //     ?.on("error", console.error);
    //   console.log("Events:", events);
    //   // court.events
    //   //   .judgeRegistered({ fromBlock: 0 })
    //   //   ?.on("data", (event) => {
    //   //     setJudgeId(event?.returnValues?._judgeId);
    //   //   })
    //   //   ?.on("changed", (event) => {
    //   //     console.log("NEWWW", event);
    //   //   })
    //   //   ?.on("error", console.error);
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      console.log("Getting lawyer ID...");
      if (!court || !court.events || !court.events.lawyerRegistered) {
        console.error("Court or its properties are undefined");
        return;
      }
      var events = await court.events
        .lawyerRegistered({ fromBlock: 0 })
        .on("data", (event) => {
          const num = event.returnValues._lawyerId;
          console.log("Lawyer ID received:", num);
          if (num) {
            setLawyerId(String(num));
            console.log("Lawyer ID set:", num);
          } else {
            console.error("Lawyer ID is undefined");
          }
        })
        .on("changed", (event) => {
          console.log("Event changed:", event);
        })
        .on("error", (error) => {
          console.error("Error fetching lawyer ID:", error);
        });
      console.log("Events:", events);
    } catch (error) {
      console.error("Error in getValue:", error);
    }
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
      downloadPrivateKey(person.privateKey);
      console.log("ress", name, email, phone, address, pubkey);
      // Download private key logic
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // Handle error notification or display
    }
  };
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
  const lawyerIdd = Number(lawyerId);
  console.log("lawyerId", lawyerIdd);

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
          placeholder={`Eth address:${passableItems.account}`}
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
      {loading && <p className=" mt-4 text-center">Loading...</p>}
      {lawyerId && (
        <h3 className="text-center">Your Lawyer Id is: {lawyerIdd}</h3>
      )}
    </div>
  );
};

export default Register;
