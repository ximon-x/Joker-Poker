// @ts-nocheck
import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

export async function initializeContract() {
  const near = await connect(
    Object.assign(
      {
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      },
      nearEnv
    )
  );

  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ["get_player", "get_all_players"],
      changeMethods: [
        "joker_poker",
        "black_red",
        "higher_lower",
        "register_player",
      ],
    }
  );
}

export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

export async function login() {
  return window.walletConnection.requestSignIn({
    contractId: process.env.CONTRACT_NAME,
  });
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}
