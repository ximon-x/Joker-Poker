use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

// Player Mapping {address -> {rank, points}}
// Card enums RANK, VALUE

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct JokerPoker {
    card_value: u8,
}

#[near_bindgen]
impl JokerPoker {
    #[init]
    pub fn init() -> Self {
        Self { card_value: 0 }
    }

    // function for generating random card

    // higher_lower function

    // joker_poker function

    // function for paying player
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//      test for randomness

//      test for higher_lower

//      test for joker_poker

//      test for transfer NEAR
// }
