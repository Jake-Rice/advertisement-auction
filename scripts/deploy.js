const hre = require("hardhat"); //import the hardhat

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address); 

  const AdAuction = await hre.ethers.getContractFactory("AdAuction"); // Getting the Contract
  const contract = await AdAuction.deploy("Google, for all your Googley needs!", "https://img-new.cgtrader.com/items/2590270/190c8c862e/google-logo-v1-001-3d-model-low-poly-max-obj-3ds-fbx-ma-stl.jpg", "https://google.com/", 10 **15, 10**15); //deploying the contract

  await contract.deployed(); // waiting for the contract to be deployed

  console.log("AdAuction deployed to:", contract.address); // Returning the contract address on the rinkeby
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract 
