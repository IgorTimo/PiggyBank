const { task, types } = require("hardhat/config");

const MIN_CONFIRMATIONS_TO_WAIT = 6;

task(
  "add-factory",
  "Creates a new Factory and registers it in Master.")
.addParam("factoryName", "The name of the Piggy Bank Factory contract.")
.addParam("piggyBankType", "The key under which the Factory will be registered in the Master.")
.addParam("masterAddress", "The address of the Piggy Bank Master contract.")
.setAction(async ({
    factoryName,
    piggyBankType,
    masterAddress
  }, {
    ethers
  }) => {
    const Master = await ethers.getContractFactory("PiggyBankMaster");
    const master = Master.attach(masterAddress);

    console.log(`Deploying ${factoryName}...`);

    const Factory = await ethers.getContractFactory(factoryName);
    const factory = await Factory.deploy(ethers.utils.getAddress(masterAddress));
    await factory.deployed();

    console.log(`${factoryName} deployed to ${factory.address}.`);

    console.log(`Registering ${factoryName} in Master...`);

    const registerTx = await master.registerPiggyBankFactory(
      piggyBankType,
      factory.address);

    await registerTx.wait();

    console.log(`${factoryName} registered in Master.`);

    return factory.address;
  }
);

// TODO:  Iterate through all Factories, parse their ABI,
//        and create specific verification tasks for each Factory.
task(
  "verify-piggy-bank-at-etherscan",
  "Verifies and publishes Piggy Bank source code. " +
  "A new Piggy Bank contract will be deployed in order to link the sources to it.")
.addParam("piggyBankName", "The name of the Piggy Bank contract.")
.addOptionalParam("factoryName", "The name of the Piggy Bank Factory contract.")
.addParam("factoryAddress", "The address of the Piggy Bank Factory contract.")
.addParam("masterAddress", "The address of the Piggy Bank Master contract.")
.addParam("createMethod", "The signature of the the Piggy Bank creation method of the Factory.")
.addParam("createArgList", "Semicolon separated list of arguments to pass into the Piggy Bank creation method of the Factory.")
.setAction(async ({
    piggyBankName,
    factoryName,
    factoryAddress,
    masterAddress,
    createMethod,
    createArgList
  }, {
    ethers,
    run
  }) => {
    const Master = await ethers.getContractFactory("PiggyBankMaster");
    const master = Master.attach(masterAddress);

    factoryName = factoryName ?? `${piggyBankName}Factory`;

    const Factory = await ethers.getContractFactory(factoryName);
    const factory = Factory.attach(factoryAddress);

    console.log(`Creating ${piggyBankName} via its Factory...`);

    const createArgs = createArgList.split(";");
    const createTx = await factory.functions[createMethod](...createArgs);
    await createTx.wait(MIN_CONFIRMATIONS_TO_WAIT);
    // TODO:  Consider using event to get address of the newly created Piggy Bank.

    console.log(`A new ${piggyBankName} created.`);
    console.log(`Querying Master for the address of the new ${piggyBankName} contract...`);

    // WARNING:  This approach is extremely fragile as there is no guarantee that the 1st
    //           argument is exactly an owner. Currently, it's just a kinda convention.
    const owner = createArgs[0];

    const piggyBanks = await master.callStatic.getPiggyBanksByOwner(owner);
    const lastPiggyBankAddress = piggyBanks.at(-1).piggyBankAddress;

    console.log(`The new ${piggyBankName} contract was deployed to ${lastPiggyBankAddress}.`);

    console.log(`Verifying ${piggyBankName} source code at etherscan...`);

    try {
      await run("verify:verify", {
        address: lastPiggyBankAddress,
        // contract format: <path-to-contract>:<contract-name>
        contract: `contracts/${piggyBankName}.sol:${piggyBankName}`,
        constructorArguments: createArgs
      });
    } catch (error) {
      if (error.toString().includes("Reason: Already Verified")) {
        console.log(`${piggyBankName} source code was already verified.`);
        
      } else {
        throw error;
      }
    }
  }
);

task(
  "add-factory-and-verify-piggy-bank-at-etherscan",
  "Creates a new Factory and registers it in Master, " +
  "and then verifies and publishes Piggy Bank source code.")
.addParam("piggyBankName", "The name of the Piggy Bank contract.")
.addOptionalParam("factoryName", "The name of the Piggy Bank Factory contract.")
.addParam("piggyBankType", "The key under which the Factory will be registered in the Master.")
.addParam("masterAddress", "The address of the Piggy Bank Master contract.")
.addParam("createMethod", "The signature of the the Piggy Bank creation method of the Factory.")
.addParam("createArgList", "Semicolon separated list of arguments to pass into the Piggy Bank creation method of the Factory.")
.setAction(async ({
    piggyBankName,
    factoryName,
    piggyBankType,
    masterAddress,
    createMethod,
    createArgList
  }, {
    run
  }) => {
    factoryName = factoryName ?? `${piggyBankName}Factory`;

    const factoryAddress = await run("add-factory", {
      factoryName,
      piggyBankType,
      masterAddress
    });

    await run("verify-piggy-bank-at-etherscan", {
      piggyBankName,
      factoryName,
      factoryAddress,
      masterAddress,
      createMethod,
      createArgList
    });
});