import { ethers } from "ethers";
import defaultProvider from "../../defaultProvider";

// const abi = [
//   {
//     inputs: [
//       { internalType: "address", name: "_owner", type: "address" },
//       { internalType: "string", name: "_desc", type: "string" },
//       { internalType: "uint256", name: "_targetAmount", type: "uint256" },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     inputs: [],
//     name: "deposit",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "desc",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "isOver",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "isWithdrawAvailable",
//     outputs: [{ internalType: "bool", name: "", type: "bool" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "targetAmount",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "withdraw",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];


const abi = ["function targetAmount() public view returns (uint256 targetAmount)"];

const AmountPiggyBank = (address) =>
  new ethers.Contract(address, abi, defaultProvider);

export default AmountPiggyBank;
