import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

// https://rinkeby.etherscan.io/address/0x5bb032badc743acfee0dc709ecf4e592ae06b36e#code
const address = "0x5bb032baDC743ACFee0Dc709Ecf4E592ae06B36e";

const abi = [
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_desc", type: "string" },
      { internalType: "uint256", name: "_targetAmount", type: "uint256" },
    ],
    name: "createAmountPiggyBank",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_desc", type: "string" },
      { internalType: "uint64", name: "_endTime", type: "uint64" },
    ],
    name: "createTimePiggyBank",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "getPiggyBanksByAddress",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_address", type: "address" }],
    name: "registerPiggyBank",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const piggyBankFactory = new ethers.Contract(address, abi, defaultProvider);

export default piggyBankFactory;
