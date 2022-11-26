import { useEffect, useState, createContext, useCallback } from "react";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "../utils/constants";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    return transactionsContract;
  };

  const getAllTransactions = useCallback(async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableTransactions =
          await transactionsContract.getAllTransactions();

        console.log(availableTransactions);

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: timeAgo.format(
              new Date(transaction.timestamp.toNumber() * 1000),
              "mini"
            ),
            message: transaction.message,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("no ethereum object found");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  }, [getAllTransactions]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install Metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      throw new Error("No ethereum Object found");
    }
  };

  const checkIfTransactionsExist = useCallback(async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTxCount = await transactionsContract.getTransactionCount();
        window.localStorage.setItem("transactionCount", currentTxCount);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        setIsLoading(true);
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        const transactionHash = await transactionsContract.transfer(
          addressTo,
          parsedAmount,
          message,
          {
            value: parsedAmount,
          }
        );

        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionCount =
          await transactionsContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        // window.location.reload();
      } else {
        console.log("no ethereum object found");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, [
    currentAccount,
    transactionCount,
    checkIfTransactionsExist,
    checkIfWalletIsConnected,
  ]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        setAddressTo,
        addressTo,
        setAmount,
        amount,
        setMessage,
        message,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
