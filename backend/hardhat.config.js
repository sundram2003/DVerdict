/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
// import "@nomicfoundation/hardhat-web3-v4";
require("@nomicfoundation/hardhat-web3-v4");
const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY;
module.exports = {
  solidity: "0.5.0",

  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/082b205d81564ce282b6abd191f663f5`,
      accounts: [
        "d5880bf304ff44ed5625e57f3a7450e706a10eea2c5c0e6639e2ee89dc3095c6",
      ],
      network_id: 11155111,

      // gas: 500000,
      // gasPrice: 20000000000,
      saveDeployments: true,
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
};
