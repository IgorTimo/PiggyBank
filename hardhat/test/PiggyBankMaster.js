const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PiggyBankMaster", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPiggyBankMasterFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, approver, otherAccount] = await ethers.getSigners();

    const PiggyBankMaster = await ethers.getContractFactory("PiggyBankMaster");
    const piggyBankMaster = await PiggyBankMaster.deploy();

    return { piggyBankMaster, owner, approver, otherAccount };
  }

  describe("Deployment", function () {
    it("Should get Piggy Banks by owner address", async function () {
      const { piggyBankMaster, owner } = await loadFixture(deployPiggyBankMasterFixture);

      expect(
        await piggyBankMaster.getPiggyBanksByOwner(owner.address)
      ).to.be.instanceOf(Array).and.be.empty;
    });
  });

  describe("Piggy Bank factory registration", function () {
    it("Should fail on attempt to register Piggy Bank factory more than once", async function () {
      const { piggyBankMaster } = await loadFixture(deployPiggyBankMasterFixture);
      
      const ApprovePiggyBankFactory = await ethers.getContractFactory("ApprovePiggyBankFactory");
      const approvePiggyBankFactory = await ApprovePiggyBankFactory.deploy(piggyBankMaster.address);

      const sameFactoryAddress = approvePiggyBankFactory.address;

      await expect(
        piggyBankMaster.registerPiggyBankFactory("Once", sameFactoryAddress)
      ).not.to.be.reverted;

      await expect(
        piggyBankMaster.registerPiggyBankFactory("Twice", sameFactoryAddress)
      ).to.be.revertedWith("Factory is already registered!");
    });

    it("Should fail on attempt to register Piggy Bank factory with already registered Piggy Bank Type", async function () {
      const { piggyBankMaster } = await loadFixture(deployPiggyBankMasterFixture);
      
      const ApprovePiggyBankFactory = await ethers.getContractFactory("ApprovePiggyBankFactory");
      const approvePiggyBankFactory = await ApprovePiggyBankFactory.deploy(piggyBankMaster.address);
      
      const TimePiggyBankFactory = await ethers.getContractFactory("TimePiggyBankFactory");
      const timePiggyBankFactory = await TimePiggyBankFactory.deploy(piggyBankMaster.address);

      const samePiggyBankType = "SameForBoth";

      await expect(
        piggyBankMaster.registerPiggyBankFactory(samePiggyBankType, approvePiggyBankFactory.address)
      ).not.to.be.reverted;

      await expect(
        piggyBankMaster.registerPiggyBankFactory(samePiggyBankType, timePiggyBankFactory.address)
      ).to.be.revertedWith("Piggy bank type is already in use!");
    });
  });

  describe("Handling Piggy Bank creation", function () {
    it("Should store created Piggy Bank", async function () {
      const { piggyBankMaster, owner } = await loadFixture(deployPiggyBankMasterFixture);
      
      const AmountPiggyBankFactory = await ethers.getContractFactory("AmountPiggyBankFactory");
      const amountPiggyBankFactory = await AmountPiggyBankFactory.deploy(piggyBankMaster.address);

      const piggyBankType = "Approve";

      const registrationTx = await piggyBankMaster.registerPiggyBankFactory(piggyBankType, amountPiggyBankFactory.address);
      await registrationTx.wait();

      const description = "Amount Piggy Bank (1)";
      const targetAmount = 42;

      const amountPiggyBankAddress = await amountPiggyBankFactory.callStatic.createAmountPiggyBank(
        owner.address,
        description,
        targetAmount);

      const creationTx = await amountPiggyBankFactory.createAmountPiggyBank(
        owner.address,
        description,
        targetAmount);

      await creationTx.wait(); 

      const ownerPiggyBanks = await piggyBankMaster.callStatic.getPiggyBanksByOwner(owner.address);

      expect(ownerPiggyBanks).to.have.lengthOf(1);

      const piggyBankStruct = ownerPiggyBanks[0];
      expect(piggyBankStruct).has.ownProperty("piggyBankAddress", amountPiggyBankAddress);
      expect(piggyBankStruct).has.ownProperty("piggyBankType", piggyBankType);
    });

    it("Should allow notifications from registered factories only", async function () {
      const { piggyBankMaster, owner } = await loadFixture(deployPiggyBankMasterFixture);
      
      const AmountPiggyBankFactory = await ethers.getContractFactory("AmountPiggyBankFactory");
      const amountPiggyBankFactory = await AmountPiggyBankFactory.deploy(piggyBankMaster.address);
      // Note:  Skippng factory registration intentionally.

      const description = "Amount Piggy Bank (1)";
      const targetAmount = 42;

      await expect(
        amountPiggyBankFactory.createAmountPiggyBank(owner.address, description, targetAmount)
      ).to.revertedWith("Not a known factory!");

      expect(await piggyBankMaster.getPiggyBanksByOwner(owner.address)).to.be.empty;
    });
  });

  describe("Resolving Piggy Bank Type", function () {
    it("Should resolve Piggy Bank Type by Piggy Bank address", async function () {
      const { piggyBankMaster, owner } = await loadFixture(deployPiggyBankMasterFixture);
      
      const AmountPiggyBankFactory = await ethers.getContractFactory("AmountPiggyBankFactory");
      const amountPiggyBankFactory = await AmountPiggyBankFactory.deploy(piggyBankMaster.address);

      const expectedPiggyBankType = "Approve";

      const registrationTx = await piggyBankMaster.registerPiggyBankFactory(expectedPiggyBankType, amountPiggyBankFactory.address);
      await registrationTx.wait();

      const description = "Amount Piggy Bank (1)";
      const targetAmount = 42;

      const amountPiggyBankAddress = await amountPiggyBankFactory.callStatic.createAmountPiggyBank(
        owner.address,
        description,
        targetAmount);

      const creationTx = await amountPiggyBankFactory.createAmountPiggyBank(
        owner.address,
        description,
        targetAmount);

      await creationTx.wait(); 

      const actualPiggyBankType = await piggyBankMaster.callStatic.getPiggyBankType(
        amountPiggyBankAddress
      );

      expect(actualPiggyBankType).to.be.eq(expectedPiggyBankType);
    });
  });
});
