const connectMetamask = async (updateFunc) => {
  const { ethereum } = window;
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const chainId = await ethereum.request({
      method: "eth_chainId",
    });
    if (chainId != process.env.targetChainId) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: process.env.targetChainId }],
      });
    }
    updateFunc({ currentAccount: accounts[0] });
    sessionStorage.setItem("currentAccount", accounts[0]);
  } catch (error) {
    console.error(error);
  }
};

export default connectMetamask;
