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
    <div className="App">
      <header className="App-header">
        <nav className="App-nav">
          <img src={logo} className="App-nav-logo" alt="logo" />
          <ul className="App-nav-links">
            <li>
              <a href="">How To Play</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <ConnectWallet />
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-main">
        <div></div>
      </main>
      {/* <footer className="App-footer">
        <p>Made with love by Simon Samuel</p>
      </footer> */}
    </div>
  );
}

export default App;
