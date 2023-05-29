require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  settings: {
    optimizer: {
      enabled: true,
      runs: 999999,
    },
  },
};
