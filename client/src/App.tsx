import React, { useCallback, useEffect, useState } from "react";
import logo from "./images/svg/Joker_Poker_Logo.svg";
import "./App.css";
import ConnectWallet from "./components/ConnectButton";
import { getPlayer } from "./utils/games";

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
      <header className="app-header">
        <nav className="app-nav">
          <img src={logo} className="app-nav-logo" alt="logo" />
          <ul className="app-nav-links">
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
      <main className="app-main">
        <div>
          <h1 className="app-title">Welcome to Joker Poker!</h1>
        </div>
      </main>
      <footer className="app-footer">
        <p>Made with &#9829; by Simon Samuel</p>
      </footer>
    </div>
  );
}

export default App;
