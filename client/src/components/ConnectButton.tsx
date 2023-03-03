import React from "react";
import { login, logout } from "../utils/near";

function ConnectWallet() {
  // @ts-ignore
  const account = window.walletConnection.account();

  return (
    <div>
      {account.accountId ? (
        <button
          className="text-white bg-oxford-blue w-48 h-16 px-2.5 py-5 text-center font-bold inline-block cursor-pointer"
          onClick={logout}
        >
          Disconnect Wallet
        </button>
      ) : (
        // <button className={styles.connect_button} onClick={login}>
        <button
          className="text-oxford-blue bg-white w-48 h-16 px-2.5 py-5 text-center font-bold inline-block cursor-pointer"
          onClick={login}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;
