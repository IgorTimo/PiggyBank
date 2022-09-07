const disconnectMetamask = async (updateFunc) => {
  updateFunc({ currentAccount: null });
  sessionStorage.clear();
};

export default disconnectMetamask;
