use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::Serialize;
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
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
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

#[derive(BorshSerialize, BorshDeserialize, Serialize)]
pub enum CardSuit {
    Diamond,
    Club,
    Heart,
    Spade,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize, PanicOnDefault)]
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

    pub fn get_random_card(self) -> Self {
        let random_rank = self.randomize(16, 12);
        let random_suit = self.randomize(8, 3);

        let random_card_rank = match random_rank {
            0 => CardRank::Ace,
            1 => CardRank::Two,
            2 => CardRank::Three,
            3 => CardRank::Four,
            4 => CardRank::Five,
            5 => CardRank::Six,
            6 => CardRank::Seven,
            7 => CardRank::Eight,
            8 => CardRank::Nine,
            9 => CardRank::Ten,
            10 => CardRank::Jack,
            11 => CardRank::Queen,
            12 => CardRank::King,
            _ => env::panic_str("Rank was not randomized correctly!"),
        };

        let random_card_suit = match random_suit {
            0 => CardSuit::Diamond,
            1 => CardSuit::Club,
            2 => CardSuit::Heart,
            3 => CardSuit::Spade,
            _ => env::panic_str("Suit was not randomized correctly!"),
        };

        Self {
            rank: (random_card_rank),
            suit: (random_card_suit),
        }
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Games {
    players: UnorderedMap<AccountId, Player>,
}

#[near_bindgen]
impl Games {
    #[init]
    pub fn init() -> Self {
        Self {
            players: UnorderedMap::new(b"player".to_vec()),
        }
    }

    pub fn joker_poker() {}

    pub fn higher_lower() {}

    pub fn get_player_points(self, player_id: &AccountId) -> u128 {
        match self.players.get(player_id) {
            Some(player) => player.points,
            None => env::panic_str("Not a registered player"),
        }
    }

    pub fn register_player() {}

    pub fn reward_player() {}
}

// #[cfg(test)]
// mod tests {
//     use super::*;
//      test for randomness

//      test for higher_lower

//      test for joker_poker

//      test for transfer NEAR
// }
