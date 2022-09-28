const getErrorMessage = (error) => {
  if (error.code === "INSUFFICIENT_FUNDS") {
    return "Not Enough Funds";
  }

  if (error.code === "INVALID_ARGUMENT") {
    return "Invalid Input";
  }

  if (error.code === "ACTION_REJECTED") {
    return "Transaction was Rejected";
  }

  return error.message || error.code;
};

export default getErrorMessage;
