import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { connect } from "near-api-js";
import config from "../config";
import { Network } from "../types";

const network: Network = "testnet";

async function initContract() {
  const nearEnv = config.environment(network);
  const near = await connect(nearEnv);
}

const selector = await setupWalletSelector({
  network: network,
  modules: [setupMathWallet(), setupNearWallet(), setupMyNearWallet()],
});

export const modal = setupModal(selector, {
  contractId: config.contractName!,
});

modal.show();
