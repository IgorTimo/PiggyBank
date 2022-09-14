require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
   rinkeby: {
     url: "https://rinkeby.infura.io/v3/c05bb1b85f24494c9f25b359b17076b2", 
     accounts: ["db0078e71dc0671049d5a7c74e810b6d6be126267afab3a6701efeefbd3e7cff"] 
    },
  }
};
