use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};

#[derive(BorshSerialize, BorshDeserialize)]
pub enum Status {
    Noob,
    Expert,
    Legendary,
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
pub struct Player {
    rank: Status,
    points: u128,
}

#[near_bindgen]
impl Player {
    #[init]
    pub fn init() -> Self {
        Self {
            points: 0,
            rank: Status::Noob,
        }
    }

    #[private]
    pub fn add_points(&mut self, points: u128) {
        self.points = self.points + points;
    }

    #[private]
    pub fn upgrade_rank(&mut self) {
        match self.rank {
            Status::Noob => self.rank = Status::Expert,
            Status::Expert => self.rank = Status::Legendary,
            Status::Legendary => env::panic_str("Already a Legend!"),
        }
    }
}

// Card enums RANK, VALUE
#[derive(BorshDeserialize, BorshSerialize)]
pub enum CardRank {
    Ace,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum CardSuit {
    Diamond,
    Club,
    Heart,
    Spade,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Card {
    rank: CardRank,
    suit: CardSuit,
}

#[near_bindgen]
impl Card {
    pub fn randomize(&self, index: usize, max: usize) -> u32 {
        let seed = *env::random_seed().get(index).unwrap();
        let rand_divider = 256 as f64 / (max + 1) as f64;
        let result = seed as f64 / rand_divider;
        result as u32
    }

    pub fn get_random_card(self) {
        let random_rank = self.randomize(16, 12);
        let random_suit = self.randomize(8, 3);
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct JokerPoker {
    players: UnorderedMap<AccountId, Player>,
}

#[near_bindgen]
impl JokerPoker {
    pub fn get_player_points(self, player_id: &AccountId) -> u128 {
        match self.players.get(player_id) {
            Some(player) => player.points,
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
