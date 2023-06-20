const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

//* How to change this file
/*
- Fill in the `ContractName` with your contract name.
- Uncomment the verification process if you want to verify your contract but make sure to uncomment the same in the `hardhat.config.js` and change the values as required.

You can pass in values into your contract like doing the following :
ex : Asssume you have a string and a number to pass
` const lock = await Lock.deploy("hello", 5);`
*/

//* Sample Deployment
/*
  const Lock = await hre.ethers.getContractFactory("ContractName");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Contract Deployed to : ", lock.address);

  console.log("Sleeping...");
  await sleep(50000);
  await hre.run("verify:verify", {
    address: lock.address,
    constructorArguments: [],
  });
*/

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await hre.ethers.deployContract("FakeNFTMarketplace");
  await FakeNFTMarketplace.deployed();
  console.log("FakeNFTMarketplace deployed to: ", FakeNFTMarketplace.address);

  // Now deploy the CryptoDevsDAO contract
  const CryptoDevsDAO = await hre.ethers.deployContract(
    "CryptoDevsDAO",
    [FakeNFTMarketplace.address, CRYPTODEVS_NFT_CONTRACT_ADDRESS],
    { value: hre.ethers.utils.parseEther(".02") } 
  );
  await CryptoDevsDAO.deployed();
  console.log("CryptoDevsDAO deployed to: ", CryptoDevsDAO.address);
}

// Async Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
