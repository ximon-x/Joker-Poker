use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};

#[derive(BorshSerialize, BorshDeserialize)]
pub enum Rank {
    Noob,
    Expert,
    Legendary,
}

// Player Mapping {address -> {rank, points}}
#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
pub struct Player {
    rank: Rank,
    points: u128,
}

#[near_bindgen]
impl Player {
    #[init]
    pub fn init() -> Self {
        Self {
            points: 0,
            rank: Rank::Noob,
        }
    }

    #[private]
    pub fn add_points(&mut self, points: u128) {
        self.points = self.points + points;
    }

    pub fn get_points(self) -> u128 {
        self.points
    }

    #[private]
    pub fn upgrade_rank(&mut self) {
        match self.rank {
            Rank::Noob => self.rank = Rank::Expert,
            Rank::Expert => self.rank = Rank::Legendary,
            Rank::Legendary => env::panic_str("Already a Legend!"),
        }
    }
}

// Card enums RANK, VALUE
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct JokerPoker {
    players: UnorderedMap<AccountId, Player>,
}

#[near_bindgen]
impl JokerPoker {
    pub fn get_player_points(self, player_id: &AccountId) -> u128 {
        match self.players.get(player_id) {
            Some(player) => player.get_points(),
            None => env::panic_str("Not a registered player"),
        }
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
