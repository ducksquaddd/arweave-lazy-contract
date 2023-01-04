import { WarpFactory } from "warp-contracts";

import data from "./data.json" assert { type: "json" };
import wallet from "../testwallet.json" assert { type: "json" };

async function editPost() {
  const WARP = WarpFactory.forTestnet(); // Create Warp client to interact with smart contract

  let contract = WARP.contract(data.contractId).connect(wallet); // Fetch the contract data

  contract.writeInteraction({
    function: "modifyPost",
    post: {
      title: "New Title",
      body: "This is my new very awesome body text",
      id: "ID_TO_EDIT",
    },
  });
}

editPost();
