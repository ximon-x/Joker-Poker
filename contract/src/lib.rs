use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::near_bindgen;

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
}

// #[cfg(test)]
// mod tests {
//     use super::*;
// }
