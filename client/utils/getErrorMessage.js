const getErrorMessage = (code) => {
  if (code === "INSUFFICIENT_FUNDS") {
    return "Not Enough Funds";
  }

  if (code === "INVALID_ARGUMENT") {
    return "Invalid Input";
  }

  if (code === "ACTION_REJECTED") {
    return "Transaction was Rejected";
  }

  return code;
};

export default getErrorMessage;
