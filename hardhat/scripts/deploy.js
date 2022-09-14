const hre = require("hardhat");


// введите эту команду в терминал для деплоя: npx hardhat run scripts/deploy.js --network rinkeby

async function main() {
  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contract with the account:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("PiggyBankMaster");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`Contract deployed to ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
