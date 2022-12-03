import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = [
  "function approver() public view returns (address approver)",
  "function isApproved() public view returns (bool isApproved)",
  "function setApproved() public"
];

const ApprovePiggyBank = (address) =>
  new ethers.Contract(address, abi, defaultProvider);

export default ApprovePiggyBank;
