import { ENV } from "./types";

export const modalStyles = {
  content: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "20%",
    background: "#e5e5e5",
    color: "#14213d",
  },
};

const CONTRACT_NAME = import.meta.env.CONTRACT_NAME;

function environment(env: ENV) {
  switch (env) {
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
    default:
      throw Error(`Unknown Environment ${env}`);
  }
}

export default environment;
