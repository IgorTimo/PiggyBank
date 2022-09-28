import AmmoutForm from "../components/create_forms/AmmoutForm";
import ApproveForm from "../components/create_forms/ApproveForm";
import TimeForm from "../components/create_forms/TimeForm";
import createAmountPiggyBank from "../utils/createAmountPiggyBank";
import createApprovePiggyBank from "../utils/createApprovePiggyBank";

import createTimePiggyBank from "../utils/createTimePiggyBank";

const formsData = {
    amount: {
      title: "Amount Piggy Bank",
      form: AmmoutForm,
      createFunc: createAmountPiggyBank,
    },
    time: {
      title: "Time Piggy Bank",
      form: TimeForm,
      createFunc: createTimePiggyBank,
    },
    approve: {
      title: "Approve Piggy Bank",
      form: ApproveForm,
      createFunc: createApprovePiggyBank,
    },
  };


  export default formsData;