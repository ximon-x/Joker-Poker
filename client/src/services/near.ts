import { WalletConnection } from "near-api-js";
import { Contract } from "near-api-js";
import { connect, keyStores } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import config from "../../config";
import { Network } from "../../types";

const network: Network = "testnet";

export async function initContract() {
  const nearEnv = config.environment(network);
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );

  window.walletConnection = new WalletConnection(near, "");
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    config.contractName,
    {
      viewMethods: ["get_product", "get_products"],
      changeMethods: ["buy_product", "set_product"],
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

export function login() {
  window.walletConnection.requestSignIn(config.contractName);
}

export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}
