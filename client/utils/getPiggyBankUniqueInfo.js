import { ethers } from "ethers";
import { TYPE_AMOUNT_PIGGY_BANK, TYPE_APPROVE_PIGGY_BANK, TYPE_TIME_PIGGY_BANK } from "../contracts/constants/constants";
import PiggyBank from "../contracts/prggy_bank/PiggyBank";

const getPiggyBankUniqueInfo = async (address, type) => {
    const piggyBankUniqueInfo = [];
    const piggyBank = PiggyBank(address);

    if (type === TYPE_TIME_PIGGY_BANK) {
        const endTime = await piggyBank.endTime();
        const localeEndTime = new Date(+(ethers.utils.formatUnits(endTime, 0))).toLocaleString();
        piggyBankUniqueInfo.push({ name: "End time", value: localeEndTime });
    } else if (type === TYPE_AMOUNT_PIGGY_BANK) {
        const targetAmount = await piggyBank.targetAmount();
        piggyBankUniqueInfo.push({ name: "Target amount", value: ethers.utils.formatEther(targetAmount) });
    } else if (type === TYPE_APPROVE_PIGGY_BANK) {
        const approver = await piggyBank.approver();
        const isApproved = await piggyBank.isApproved();
        piggyBankUniqueInfo.push({ name: "Approver", value: approver });
        piggyBankUniqueInfo.push({ name: "Is approved", value: isApproved? "Yes": "No" });
    }

    return piggyBankUniqueInfo;
};

export default getPiggyBankUniqueInfo;
