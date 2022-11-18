import { login } from "../services/near";

function ConnectWallet() {
  const account = window.walletConnection.account();

  return (
    <>
      {account ? (
        <button>Connected</button>
      ) : (
        <button onClick={login}>CONNECT WALLET</button>
      )}
    </>
  );
}

export default ConnectWallet;
