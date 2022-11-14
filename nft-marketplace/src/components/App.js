import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBirdz from "../abis/KryptoBirdz.json";

const App = () => {
  const [account, setAccount] = useState("");

  const loadWeb3 = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log("ethereum wallet is connected");
      window.web3 = new Web3(provider);
    } else {
      console.log("no ethereum provider detected");
    }
  };

  const loadBlockChainData = async () => {
    const accounts = await window.web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  const onComponentMount = async () => {
    await loadWeb3();
    await loadBlockChainData();
  };

  useEffect(() => {
    onComponentMount();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div
          className="navbar-brand col-sm-3 col-md-3 mr-0"
          style={{ color: "white" }}
        >
          Krypto Birdz NFTs
        </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">{account}</small>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
