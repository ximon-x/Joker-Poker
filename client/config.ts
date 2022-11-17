import * as dotenv from "dotenv";
import { ConnectConfig } from "near-api-js";
import { Network } from "./types";
dotenv.config();

const contractName =
  process.env.CONTRACT_NAME || "mycontract.myaccount.testnet";

function environment(network: Network): ConnectConfig {
  switch (network) {
    case "mainnet": {
      const conn: ConnectConfig = {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
      };
      return conn;
    }
    case "testnet": {
      const conn: ConnectConfig = {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
      };
      return conn;
    }
    default:
      throw Error(`Unknown environment ${network}`);
  }
}

const config = {
  environment,
  contractName,
};

export default config;
