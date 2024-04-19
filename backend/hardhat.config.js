/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
// import "@nomicfoundation/hardhat-web3-v4";
require("@nomicfoundation/hardhat-web3-v4");
const sepoliaPrivateKey = process.env.SEPOLIA_PRIVATE_KEY;
module.exports = {
  solidity: "0.6.0",

  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/4f6f1969edfd4d219a76aa2d36019f32`,
      accounts: [
        "eed0a0759494fb2eea63e743bdbeae73236d507e0f89b0137935226355b7f3fd",
      ],
      network_id: 11155111,

      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
    },
  },
  paths: {
    artifacts: "./artifacts",
  },
};
