#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then 
    echo "=== Error Building Contract ==="
    exit 1
fi

echo "=== Deploying contract ==="

near delete joker_poker.ximon.testnet ximon.testnet 
near create-account joker_poker.ximon.testnet --masterAccount ximon.testnet --initialBalance 5
near deploy --accountId=joker_poker.ximon.testnet --wasmFile=target/wasm32-unknown-unknown/release/contract
