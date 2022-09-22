import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const address = "0x6D93779765D0232BEAE02C61E6D53017DEB5BB88";

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
        internalType: "uint64",
        name: "_endTime",
        type: "uint64",
      },
    ],
    name: "createTimePiggyBank",
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

const TimePiggyBankFactory = new ethers.Contract(address, abi, defaultProvider);

export default TimePiggyBankFactory;
