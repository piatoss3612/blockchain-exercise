import React, { useState, useEffect } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBirdz from "../abis/KryptoBirdz.json";
import "./App.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState({});
  const [totalSupply, setTotalSupply] = useState(0);
  const [kryptoBirdz, setKryptoBirdz] = useState([]);
  const [kryptoBird, setKryptoBird] = useState("");

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
    setAccount(accounts[0]);

    const networkId = await window.web3.eth.net.getId();
    const networkData = KryptoBirdz.networks[networkId];
    if (networkData) {
      let abi = KryptoBirdz.abi;
      let address = networkData.address;
      let contract = new window.web3.eth.Contract(abi, address);
      setContract(contract);

      const totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);

      let kryptoBirdz = [];
      let kryptoBird;
      for (let i = 0; i < totalSupply; i++) {
        kryptoBird = await contract.methods.kryptoBirds(i).call();
        kryptoBirdz.push(kryptoBird);
      }
      setKryptoBirdz(kryptoBirdz);
    } else {
      window.alert("Smart Contract not deployed");
    }
  };

  const onComponentMount = async () => {
    await loadWeb3();
    await loadBlockChainData();
  };

  useEffect(() => {
    onComponentMount();
  }, []);

  const mint = async (kryptoBird) => {
    await contract.methods
      .mint(kryptoBird)
      .send({ from: account })
      .once("receipt", (recipt) => {
        setKryptoBirdz([...kryptoBirdz, kryptoBird]);
      });
  };

  return (
    <div>
      <nav
        className="navbar navbar-dark fixed-top 
                bg-dark flex-md-nowrap p-0 shadow"
      >
        <div
          className="navbar-brand col-sm-3 col-md-3 mr-0"
          style={{ color: "white" }}
        >
          Krypto Birdz NFTs
        </div>
        <ul className="navbar-nav px-3">
          <li
            className="nav-item text-nowrap
                d-none d-sm-none d-sm-block
                "
          >
            <small className="text-white">{account}</small>
          </li>
        </ul>
      </nav>

      <div className="container-fluid mt-1">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto" style={{ opacity: "0.8" }}>
              <h1 style={{ color: "black" }}>KryptoBirdz NFT Marketplace</h1>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  mint(kryptoBird);
                }}
              >
                <input
                  type="text"
                  placeholder="add file location"
                  className="form-control mb-1"
                  onChange={(event) => {
                    event.preventDefault();
                    setKryptoBird(event.target.value);
                  }}
                />
                <input
                  style={{ margin: "6px" }}
                  type="submit"
                  className="btn btn-primary btn-black"
                  value="MINT"
                />
              </form>
            </div>
          </main>
        </div>
        <hr />
        <div className="row text-center">
          {kryptoBirdz.map((kryptoBird, key) => {
            return (
              <div key={key}>
                <div>
                  <MDBCard className="token img" style={{ maxWidth: "22rem" }}>
                    <MDBCardImage
                      src={kryptoBird}
                      position="top"
                      style={{ marginRight: "4px" }}
                    />
                    <MDBCardBody>
                      <MDBCardTitle> KryptoBirdz </MDBCardTitle>
                      <MDBCardText>
                        The KryptoBirdz are 20 uniquely generated KBirdz from
                        the cyberpunk cloud galaxy Mystopia!
                      </MDBCardText>
                      <MDBBtn href={kryptoBird}>Download</MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
