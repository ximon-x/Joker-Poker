import { CardColor, CardRank, CardSuit } from "./types";

const GAS = 100000000000000;

export function getPlayer() {
  // @ts-ignore
  return window.contract.get_player();
}

export async function registerPlayer() {
  // @ts-ignore
  await window.contract.register_player();
}

export async function jokerPoker(guessedRank: CardRank, guessedSuit: CardSuit) {
  // @ts-ignore
  await window.contract.joker_poker({
    guessed_card: { rank: guessedRank, suit: guessedSuit },
  });
}

export async function blackRed(guessedColor: CardColor) {
  // @ts-ignore
  await window.contract.black_red({
    guessed_color: guessedColor,
  });
}

export async function higherLower(higher: Boolean) {
  // @ts-ignore
  await window.contract.higher_lower({
    higher: higher,
  });
}
