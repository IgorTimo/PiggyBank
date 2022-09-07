const connectMetamask = async (updateFunc) => {
    const { ethereum } = window;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      updateFunc({ currentAccount: accounts[0] });
      sessionStorage.setItem("currentAccount", accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  
  export default connectMetamask;