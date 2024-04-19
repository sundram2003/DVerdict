import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout.js";
import Web3 from "web3";
import Navbar from "../components/Navbar.js";
import Main from "../Pages/Main.js";
import Court from "../contract/Court.json";

const Dapp = () => {
  const [account, setAccount] = useState("");
  const [court, setCourt] = useState("");
  const [loading, setLoading] = useState(true);
  const [GAS, setGAS] = useState("");
  const [GAS_PRICE, setGAS_PRICE] = useState("");
  //bblockchain load
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        console.log("window.ethereum", window.ethereum);
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("hello");
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };
    const loadBlockchainData = async () => {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      console.log("account", accounts);

      const networkId = await web3.eth.net.getId();
      console.log("networkId", networkId);
      console.log("Court", Court);
      const networkData = Court.networks[networkId];
      console.log("networkData", networkData);
      if (networkData) {
        const courtInstance = new web3.eth.Contract(
          Court.abi,
          networkData.address
        );
        setCourt(courtInstance);
        setGAS(500000);
        setGAS_PRICE("20000000000");
        setLoading(false);
      } else {
        window.alert("Court contract not deployed to detected network.");
      }
    };
    //load web3

    loadWeb3();
    loadBlockchainData();
  }, []);

  const addEncryptedKey = async (isLawyer, ljId, caseId, key) => {
    const { account, court, GAS, GAS_PRICE } = this.state;
    await court.methods
      .addEncryptedKey(isLawyer, ljId, caseId, key)
      .send({ from: account, gas: GAS, gasPrice: GAS_PRICE })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getEncryptedKey = async (isLawyer, ljId, caseId) => {
    const { court } = this.state;
    await court.methods.getEncryptedKey(caseId).call((err, res) => {
      console.log(res);
      return res;
    });
  };

  const passableItems = {
    court: court,
    account: account,
    GAS: GAS,
    GAS_PRICE: GAS_PRICE,
  };
  console.log("passableItems", passableItems);
  return (
    <div>
      {/* <Navbar /> */}
      {/* {loading ? (
        <p className="text-center">LOADING</p>
      ) : ( */}
      <Main passableItems={passableItems} />
      {/* )} */}
    </div>
  );
};

export default Dapp;
