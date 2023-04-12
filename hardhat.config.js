/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const alchemy_key = process.env.alchemy_key;
const acc_key = process.env.acc_key;
module.exports = {

  solidity: {
    compilers: [
      { version: "0.7.6" },
    ],
    overrides: {
      "contracts/Chainlink.sol": {
        version: "0.8.0",
      },
      "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol": {
        version: "0.8.0",
      },
    }
    },

  

  networks: {

    hardhat: {
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${alchemy_key}`,
        enabled: true,
      },
      mining: {
        auto: false,
        interval: 10000
      },
    },

  },
  mocha: {
    timeout: 100000000000000
  }
};
