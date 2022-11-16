import * as dotenv from "dotenv";
import { ConnectConfig } from "near-api-js";
import { env } from "./types";
dotenv.config();

const CONTRACT_NAME = process.env.CONTRACT_NAME;

function environment(env: env): ConnectConfig {
  switch (env) {
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
      throw Error(`Unknown environment ${env}`);
  }
}

const config = {
  environment,
};

export default config;
