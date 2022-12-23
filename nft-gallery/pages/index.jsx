import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NFTCard from "./components/nftCard";

const Home = () => {
  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [NFTs, setNFTs] = useState([]);

  const api_key = "YOUR API KEY HERE";

  const fetchNFTs = async () => {
    let nfts;
    const base_url = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    if (!collection.length) {
      console.log("fetching nfts...");

      nfts = await fetch(`${base_url}/getNFTs?owner=${wallet}`, options)
        .then((data) => data.json())
        .catch((err) => console.error(err));
    } else {
      console.log("fetching nfts for collection owned by address...");

      nfts = await fetch(
        `${base_url}/getNFTs?owner=${wallet}&contractAddresses[]=${collection}`,
        options
      )
        .then((data) => data.json())
        .catch((err) => console.error(err));
    }

    if (nfts) {
      console.log("successfully fetched owned NFTs");
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      const base_url = `https://eth-mainnet.g.alchemy.com/nft/v2/${api_key}/getNFTsForCollection`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      let nfts = await fetch(
        `${base_url}?contractAddress=${collection}&withMetadata=true`,
        options
      )
        .then((data) => data.json())
        .catch((err) => console.error(err));

      if (nfts) {
        console.log("successfully fetched collection of NFTs");
        setNFTs(nfts.nfts);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          type="text"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          placeholder="Add your wallet address"
          disabled={fetchForCollection}
          value={wallet}
          onChange={(e) => {
            setWallet(e.target.value);
          }}
        />
        <input
          type="text"
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          placeholder="Add the collection address"
          value={collection}
          onChange={(e) => {
            setCollection(e.target.value);
          }}
        />
        <label className="text-gray-600">
          <input
            type="checkbox"
            className="mr-2"
            value={fetchForCollection}
            onChange={(e) => {
              setFetchForCollection(e.target.checked);
            }}
          />
          Fetch for collection
        </label>
        <button
          className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else {
              fetchNFTs();
            }
          }}
        >
          Let's go
        </button>
      </div>
      {NFTs.length ? (
        <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
          {NFTs.map((nft, idx) => (
            <NFTCard key={idx} nft={nft} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
