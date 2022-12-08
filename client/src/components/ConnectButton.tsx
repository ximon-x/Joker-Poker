import React from "react";
import { login, logout } from "../utils/near";
import styles from "../styles/Interface.module.css";

function ConnectWallet() {
  // @ts-ignore
  const account = window.walletConnection.account();

  return (
    <div>
      {account.accountId ? (
        <button className={styles.button} onClick={logout}>
          Disconnect Wallet
        </button>
      ) : (
        <button className={styles.button} onClick={login}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;
