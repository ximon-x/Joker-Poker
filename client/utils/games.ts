// @ts-nocheck
import { CardColor, CardRank, CardSuit } from "./types";

const GAS = 100000000000000;

export function getPlayer() {
  return window.contract.get_player();
}

export async function registerPlayer() {
  await window.contract.register_player();
}

export async function jokerPoker(guessedRank: CardRank, guessedSuit: CardSuit) {
  await window.contract.joker_poker({
    guessed_card: { rank: guessedRank, suit: guessedSuit },
  });
}

export async function blackRed(guessedColor: CardColor) {
  await window.contract.black_red({
    guessed_color: guessedColor,
  });
}

export async function higherLower(higher: Boolean) {
  await window.contract.higher_lower({
    higher: higher,
  });
}
