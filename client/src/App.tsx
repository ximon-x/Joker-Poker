import React, { useCallback, useEffect, useState } from "react";
import logo from "./images/svg/Joker_Poker_Logo.svg";
import "./App.css";
import ConnectWallet from "./components/ConnectButton";
import { getPlayer } from "./utils/games";

function App() {
  const [player, setPlayer] = useState({});
  const fetchPlayer = useCallback(async () => {
    if (account.accountId) {
      setPlayer(await getPlayer());
    }
  });

  useEffect(() => {
    fetchPlayer();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectWallet />
      </header>
      <main className="App-main">
        <div>Select Game</div>
      </main>
      <footer className="App-footer">
        <h1>Made with love by Simon Samuel</h1>
      </footer>
    </div>
  );
}

export default App;
