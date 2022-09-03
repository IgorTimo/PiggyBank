import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const address = "0x5Fd55db9ca6Ea6b21d06567Baae6A3C5A5A783fd";

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
