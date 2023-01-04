import { WarpFactory } from "warp-contracts";

import data from "./data.json" assert { type: "json" };
import wallet from "../testwallet.json" assert { type: "json" };

async function readPost() {
  const WARP = WarpFactory.forTestnet(); // Create Warp client to interact with smart contract

  let contract = WARP.contract(data.contractId).connect(wallet); // Fetch the contract data

  let { cachedValue } = await contract.readState();

  console.log(cachedValue.state);
}

readPost();
