import fs from "fs";
import { WarpFactory } from "warp-contracts";

import WALLET from "../testwallet.json" assert { type: "json" }; // Fetch wallet details

async function deploy() {
  const WARP = WarpFactory.forTestnet(); // Can change to mainnet if you want i guess lel

  const INIT_STATE = fs.readFileSync("./state.json", "utf-8"); // Initial state to start the contract at

  const CONTRACT_SOURCE = fs.readFileSync("contract.js", "utf-8"); // Contract Source code in utf8 format

  /* Deploy the bad boy */
  const { contractTxId } = await WARP.deploy({
    wallet: WALLET,
    initState: INIT_STATE,
    src: CONTRACT_SOURCE,
  });

  let contract = WARP.contract(contractTxId).connect(WALLET); // Connect to the new contract

  let { cachedValue } = await contract.readState(); // Get its current state. Shouldnt have changed

  console.log("Contract state: ", cachedValue);
  console.log("Contract tx id: ", contractTxId);
}

deploy();
