import { WarpFactory } from "warp-contracts";

import data from "./data.json" assert { type: "json" };
import wallet from "../testwallet.json" assert { type: "json" };

async function createPost() {
  const WARP = WarpFactory.forTestnet(); // Create Warp client to interact with smart contract

  let contract = WARP.contract(data.contractId).connect(wallet); // Fetch the contract data

  contract.writeInteraction({
    function: "createPost",
    post: {
      title: "Example Title",
      body: "This is my very awesome body text",
    },
  });
}

createPost();
