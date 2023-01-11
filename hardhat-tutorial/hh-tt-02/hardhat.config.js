require("@nomicfoundation/hardhat-toolbox");
// require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  // gasReporter: {
  // enabled: true,
  // },
  mocha: {
    parallel: true,
  },
  etherscan: {
    apiKey: "W91AKIGNT673D833Z9DIFI4EBGJX97KSMT",
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/pdj5uK0nQc0tbM8d2zqWnDWSma0qCjy4",
      accounts: [
        "e79b77e3719fb2ce2ab57211f830698e6d2810a5c0f370a0f4c711bee841b898",
      ],
      chainId: 5,
    },
  },
};
