import React, { useCallback, useEffect, useState } from "react";
import logo from "./images/svg/Joker_Poker_Logo.svg";
import "./App.css";
import ConnectWallet from "./components/ConnectButton";
import { getPlayer } from "./utils/games";
import JokerPoker from "./components/JokerPoker";
import BlackRed from "./components/BlackRed";
import HigherLower from "./components/HigherLower";

function App() {
  const [player, setPlayer] = useState({});
  // const fetchPlayer = useCallback(async () => {
  //   if (account.accountId) {
  //     setPlayer(await getPlayer());
  //   }
  // });

  // useEffect(() => {
  //   fetchPlayer();
  // }, []);
  return (
    <div className="app">
      <header className="app_header">
        <nav className="app_nav">
          <img src={logo} className="app_nav_logo" alt="logo" />
          <ul className="app_nav_links">
            <li>
              <a href="./pages/howToPlay.tsx">How To Play</a>
            </li>
            <li>
              <a href="./pages/about.tsx">About</a>
            </li>
            <li>
              <ConnectWallet />
            </li>
          </ul>
        </nav>
      </header>
      <main className="app_main">
        <div>
          <h1 className="app_main_title">Welcome to Joker Poker!</h1>
          <h2>What game do you want to play?</h2>

          <div className="app_main_grid">
            <div>
              <BlackRed />
            </div>

            <div>
              <JokerPoker />
            </div>

            <div>
              <HigherLower />
            </div>
          </div>
        </div>
      </main>
      <footer className="app_footer">
        <p>Made with &#9829; by Simon Samuel</p>
      </footer>
    </div>
  );
}

export default App;
