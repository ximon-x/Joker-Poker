import { connect } from "near-api-js";
import config from "../config";

async function initContract() {
  const nearEnv = config.environment("testnet");
  const near = await connect(nearEnv);
}

// Wallet Setup
