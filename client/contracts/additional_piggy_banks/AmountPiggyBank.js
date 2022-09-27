import { ethers } from "ethers";
import defaultProvider from "../defaultProvider";


const abi = ["function targetAmount() public view returns (uint256 targetAmount)"];

const AmountPiggyBank = (address) =>
  new ethers.Contract(address, abi, defaultProvider);

export default AmountPiggyBank;
