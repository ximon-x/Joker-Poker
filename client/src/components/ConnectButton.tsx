import React from "react";
import { login, logout } from "../utils/near";

function ConnectButton() {
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
        <button
          className="text-oxford-blue bg-white border-black border-2 w-48 h-16 px-2.5 py-0 mx-4 text-center font-bold inline-block cursor-pointer"
          onClick={login}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default ConnectButton;
