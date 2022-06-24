require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const API_KEY = "0I2z-Lc-qoU2O37Ou32_h4OXtpAJpmA6";
const PRIVATE_KEY = "5957f1215acf2e28c162bcf625510270d1e788063525c39301835754964b33b5"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/0I2z-Lc-qoU2O37Ou32_h4OXtpAJpmA6",
      accounts: [PRIVATE_KEY]
    }
  }
};
