#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then 
    echo "\n=== Error Building Contract ==="
    exit 1
fi

echo "\n=== Deploying contract ==="

echo "\n== Deleting previous contract =="
near delete joker-poker.ximon.testnet ximon.testnet 

echo "\n== Creating new Account =="
near create-account joker-poker.ximon.testnet --masterAccount ximon.testnet --initialBalance 5

echo "\n== Deploying wasm file =="
near deploy --accountId=joker-poker.ximon.testnet --wasmFile=target/wasm32-unknown-unknown/release/contract.wasm

echo "\n== Initializing the Deployed contract =="
near call joker-poker.ximon.testnet init --accountId=ximon.testnet