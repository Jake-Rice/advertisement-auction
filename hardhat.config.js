require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it working

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.11",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/e98214b47f724efdb547ad61975384ba", //Infura url with projectId
      accounts: [process.env.WALLET_PRIVATE_KEY] // add the account that will deploy the contract (private key)
     },
   }
};
