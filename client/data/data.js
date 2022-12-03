import AmountPiggyBankInfo from "../components/additional_info/AmountPiggyBankInfo";
import TimePiggyBankInfo from "../components/additional_info/TimePiggyBankInfo";
import ApprovePiggyBankInfo from "../components/additional_info/ApprovePiggyBankInfo";
import AmmoutForm from "../components/create_forms/AmmoutForm";
import ApproveForm from "../components/create_forms/ApproveForm";
import TimeForm from "../components/create_forms/TimeForm";
import createAmountPiggyBank from "../utils/createAmountPiggyBank";
import createApprovePiggyBank from "../utils/createApprovePiggyBank";
import createTimePiggyBank from "../utils/createTimePiggyBank";

const data = {
  AmountPiggyBank: {
    title: "Amount Piggy Bank",
    form: AmmoutForm,
    createFunc: createAmountPiggyBank,
    view: AmountPiggyBankInfo,
  },
  TimePiggyBank: {
    title: "Time Piggy Bank",
    form: TimeForm,
    createFunc: createTimePiggyBank,
    view: TimePiggyBankInfo,
  },
  ApprovePiggyBank: {
    title: "Approve Piggy Bank",
    form: ApproveForm,
    createFunc: createApprovePiggyBank,
    view: ApprovePiggyBankInfo,
  },
};

export default data;
