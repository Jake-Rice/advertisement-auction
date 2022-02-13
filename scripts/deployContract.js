async function main() {
    const MyContract = await ethers.getContractFactory("AdAuction");
    const myContract = await MyContract.deploy("text", "image", "link", 1000000, 1000000);
  
    console.log("Contract deployed to:", myContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
  });
  