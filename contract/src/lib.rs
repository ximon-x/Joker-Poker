use std::fmt;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, Promise};
use near_units::parse_near;

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
pub enum Status {
    Noob,
    Expert,
    Legendary,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, PanicOnDefault)]
pub struct Player {
    status: Status,
    points: u128,
}

impl Player {
    pub fn add_points(&mut self, points: u128) {
        self.points = self.points + points;
        env::log_str("{self.points has been increased!}");
    }

    pub fn upgrade_status(&mut self) {
        match self.status {
            Status::Noob => self.status = Status::Expert,
            Status::Expert => self.status = Status::Legendary,
            Status::Legendary => env::panic_str("Already a Legend!"),
        };
    }
}

#[derive(
    BorshDeserialize, BorshSerialize, Serialize, Deserialize, PartialEq, PartialOrd, Debug,
)]
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

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, PartialEq, Debug)]
pub enum CardSuit {
    Diamond,
    Club,
    Heart,
    Spade,
}

#[derive(Serialize, Deserialize)]
pub enum CardColor {
    Black,
    Red,
}

#[derive(
    BorshDeserialize, BorshSerialize, Serialize, Deserialize, PanicOnDefault, PartialEq, Debug,
)]
pub struct Card {
    rank: CardRank,
    suit: CardSuit,
}

impl fmt::Display for Card {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        fmt::Debug::fmt(self, f)
    }
}

impl Card {
    fn randomize(index: usize, max: usize) -> u32 {
        let seed = *env::random_seed().get(index).unwrap();
        let rand_divider = 256 as f64 / (max + 1) as f64;
        let result = seed as f64 / rand_divider;
        result as u32
    }

    pub fn get_random_card(index: usize) -> Self {
        let random_rank = Self::randomize(index + 2, 12);
        let random_suit = Self::randomize(index - 2, 3);

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
    #[init(ignore_state)]
    pub fn init() -> Self {
        Self {
            players: UnorderedMap::new(b"player".to_vec()),
        }
    }

    // Chances of winning this game is very low.
    // You have to predict the exact card generated!
    // Winning this game gives you 1000 points.
    pub fn joker_poker(&mut self, guessed_card: Card) {
        let generated_card = Card::get_random_card(10);

        match self.players.get(&env::signer_account_id()) {
            Some(ref mut player) => {
                if generated_card == guessed_card {
                    player.add_points(500);
                    env::log_str("You are awesome for guessing correctly!");
                    // the bug occurs here.

                    self.reward_player(player);
                    self.players.insert(&env::signer_account_id(), &player);
                } else {
                    env::log_str("Sorry, you didn't guess correctly.");
                    env::log_str(&generated_card.to_string());
                }
            }
            None => env::panic_str("Player not found!"),
        }
    }

    pub fn black_red(&mut self, guessed_color: CardColor) {
        let generated_card = Card::get_random_card(8);

        match self.players.get(&env::signer_account_id()) {
            Some(ref mut player) => match guessed_color {
                CardColor::Black => {
                    if generated_card.suit == CardSuit::Club
                        || generated_card.suit == CardSuit::Spade
                    {
                        player.add_points(50);
                        env::log_str("Superb! you guessed correctly.");
                        self.reward_player(player);
                        self.players.insert(&env::signer_account_id(), &player);
                    } else {
                        env::log_str("Sorry, you didn't guess correctly.");
                        env::log_str(&generated_card.to_string());
                    }
                }
                CardColor::Red => {
                    if generated_card.suit == CardSuit::Diamond
                        || generated_card.suit == CardSuit::Heart
                    {
                        player.add_points(50);
                        env::log_str("Superb! you guessed correctly.");
                        self.reward_player(player);
                    } else {
                        env::log_str("Sorry, you didn't guess correctly.");
                        env::log_str(&generated_card.to_string());
                    }
                }
            },
            None => env::panic_str("Player not found!"),
        };
    }

    pub fn higher_lower(&mut self, higher: bool) {
        let generated_card_1 = Card::get_random_card(15);
        let generated_card_2 = Card::get_random_card(21);

        match self.players.get(&env::signer_account_id()) {
            Some(ref mut player) => match higher {
                true => {
                    if generated_card_1.rank > generated_card_2.rank {
                        player.add_points(20);
                        env::log_str("You were right, Card A > Card B");
                        self.reward_player(player);

                        self.players.insert(&env::signer_account_id(), &player);
                    } else {
                        env::log_str("Sorry, A wasn't higher than B");
                        env::log_str(&generated_card_1.to_string());
                        env::log_str(&generated_card_2.to_string());
                    }
                }
                false => {
                    if generated_card_1.rank < generated_card_2.rank {
                        player.add_points(20);
                        env::log_str("You were right, Card A < Card B");
                        self.reward_player(player);

                        self.players.insert(&env::signer_account_id(), &player);
                    } else {
                        env::log_str("Sorry, A wasn't lower than B");
                        env::log_str(&generated_card_1.to_string());
                        env::log_str(&generated_card_2.to_string());
                    }
                }
            },
            None => env::panic_str("Player not found!"),
        }
    }

    pub fn get_player(&self) -> Player {
        let player_id = env::signer_account_id();
        match self.players.get(&player_id) {
            Some(player) => player,
            None => env::panic_str("Not a registered player"),
        }
    }

    pub fn get_all_players(&self) -> Vec<(AccountId, Player)> {
        self.players.to_vec()
    }

    pub fn register_player(&mut self) {
        let player_id = env::signer_account_id();
        match self.players.get(&player_id) {
            Some(_player) => env::panic_str("Player already registered!"),
            None => self.players.insert(
                &player_id,
                &Player {
                    status: Status::Noob,
                    points: 10,
                },
            ),
        };

        env::log_str("You have registered successfully.");
    }

    #[private]
    pub fn reward_player(&mut self, player: &mut Player) {
        match player.status {
            Status::Legendary => env::log_str("You're incredible, A Legend!"),
            Status::Expert => match player.points {
                100..=999 => env::log_str("Keep Racking Points, Expert!"),
                1000..=9999 => {
                    env::log_str("Here's your reward.");
                    Promise::new(env::signer_account_id()).transfer(parse_near!("1"));
                    player.upgrade_status();
                    env::log_str("Promoted to Legendary!");
                }
                _ => env::panic_str("Invalid points for an Expert."),
            },
            Status::Noob => match player.points {
                0..=99 => env::log_str("Keep Racking Points!, Noob"),
                100..=999 => {
                    env::log_str("Here's your reward.");
                    Promise::new(env::signer_account_id()).transfer(parse_near!("0.1"));
                    player.upgrade_status();
                    env::log_str("Promoted to an Expert!");
                }
                _ => env::panic_str("Invalid points for a Noob."),
            },
        }
    }

    #[payable]
    pub fn deposit_rewards() {
        env::log_str("Thank for contributing to this project.");
    }
}
