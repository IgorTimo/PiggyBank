import { ethers } from "ethers";
import provider from "../contracts/metamaskProvider";

const getPiggyBankBalance = async (address) => {
    try {
        const balance = await provider.getBalance(address);
        return ethers.utils.formatEther(balance);
    } catch (error) {
        console.error(error);
        return 0;
    }
};

export default getPiggyBankBalance;
