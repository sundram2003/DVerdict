const hre = require("hardhat");
// import artifacts from "../artifacts/contracts/Court.sol/Court.json";
async function main() {
  const justice = await hre.ethers.getContractFactory("Court");
  console.log("Justice", justice);
  const court = await justice.deploy();
  console.log("Court", court);
  await court.deployed();

  console.log("Contract address:", court.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});