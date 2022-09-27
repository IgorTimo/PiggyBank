import AmmoutForm from "../components/create_forms/AmmoutForm";
import createAmmountPiggyBank from "../utils/createAmmountPiggyBank";

const formsData = {
    amount: {
      title: "Amount Piggy Bank",
      view: AmmoutForm,
      func: createAmmountPiggyBank,
    },
    time: {
      title: "Time Piggy Bank",
      view: AmmoutForm,
      func: createAmmountPiggyBank,
    },
    approve: {
      title: "Approve Piggy Bank",
      view: AmmoutForm,
      func: createAmmountPiggyBank,
    },
  };


  export default formsData;