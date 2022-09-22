import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const address = "0x223559F2DA9444FA1DE2F4F59E4CAB00D3C97565";

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
        internalType: "address",
        name: "_approver",
        type: "address",
      },
    ],
    name: "createApprovePiggyBank",
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

const ApprovePiggyBankFactory = new ethers.Contract(
  address,
  abi,
  defaultProvider
);

export default ApprovePiggyBankFactory;
