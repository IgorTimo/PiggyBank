import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";

const abi = ["function endTime() public view returns (uint64 endTime)"];

const TimePiggyBank = (address) =>
  new ethers.Contract(address, abi, defaultProvider);

export default TimePiggyBank;