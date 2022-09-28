import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const address = "0x0400956139F955C93DCF45982bF4175510FB19C2";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_master",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "_desc",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_targetAmount",
        type: "uint256",
      },
    ],
    name: "createAmountPiggyBank",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const amountPiggyBankFactory = new ethers.Contract(
  address,
  abi,
  defaultProvider
);

export default amountPiggyBankFactory;
