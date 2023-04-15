require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/wo1q7Sy-6o0hJzdkp567w43UiCLwibjF`,
      accounts: ["a356d3b83eac814939f41d96ba8875470563fb4d251696f675eb24400be34a9d"],
    },
  },
};
