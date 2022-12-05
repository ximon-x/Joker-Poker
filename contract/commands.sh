# Registering a player
near call joker_poker.ximon.testnet register_player --accountId=ximon.testnet

# Getting all player scores.
near call joker_poker.ximon.testnet get_all_players --accountId=ximon.testnet 

# Interacting with the joker_poker game
near call joker_poker.ximon.testnet joker_poker '{"guessed_card": {"rank": "Nine", "suit": "Diamond"}}' --accountId=ximon.testnet

# Interacting with the black_red game
near call joker_poker.ximon.testnet black_red '{"guessed_color": "Black"}' --accountId=ximon.testnet

# Interacting with the higher_lower game
near call joker_poker.ximon.testnet higher_lower '{"higher": true }' --accountId=ximon.testnet
