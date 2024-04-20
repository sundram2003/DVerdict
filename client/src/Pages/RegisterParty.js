import React, { useState } from "react";
import { createIdentity } from "eth-crypto";

const RegisterParty = ({ passableItems }) => {
  const [loading, setLoading] = useState(false);
  const [partyId, setPartyId] = useState("");
  const { publicKey, privateKey } = createIdentity();

  const registerParty = async (name, phone, email, address, pubkey) => {
    try {
      const { account, court, GAS, GAS_PRICE } = passableItems;
      const result = await court.methods
        .registerParty(name, phone, email, address, pubkey)
        .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });

      console.log("Registration result:", result);

      getValue(court);
    } catch (error) {
      console.error("Error registering party:", error);
    }
  };

  let num;
  const getValue = async (court) => {
    try {
      console.log("Getting party ID...");
      var events = await court?.events
        ?.partyRegistered({ fromBlock: 0 })
        .on("data", (event) => {
          num = event?.returnValues._partyId;
          setPartyId(String(num));
          console.log("Party ID set:", event?.returnValues._partyId);
        })
        ?.on("changed", (event) => {
          console.log("NEWWW", event);
        })
        ?.on("error", console.error);
      console.log("Events:", events);
    } catch (error) {
      console.error("Error:", error);
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
      const name = e.target.elements.name.value;
      const email = e.target.elements.email.value;
      const phone = e.target.elements.phone.value;
      const address = passableItems.account;
      const pubkey = person.publicKey;

      registerParty(name, phone, email, address, pubkey);
      downloadPrivateKey(person.privateKey);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
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

  const partyIdd = Number(partyId);

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Register Party</h1>
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
      {partyId && <h3 className="text-center">Your Party ID is: {partyIdd}</h3>}
    </div>
  );
};

export default RegisterParty;
