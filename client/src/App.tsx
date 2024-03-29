import React from "react";
import logo from "./images/svg/Joker_Poker_Logo.svg";
import "./App.css";
import JokerPoker from "./components/JokerPoker";
import BlackRed from "./components/BlackRed";
import HigherLower from "./components/HigherLower";
import ConnectButton from "./components/ConnectButton";

function App() {
  return (
    <div className="text-center">
      <header className="bg-orange-web max-h-[20vh]: px-2.5 py-2.5 relative">
        <nav className="flex items-center justify-between">
          <img src={logo} className="w-64 h-20" alt="logo" />
          <ul className="px-0 py-0 m-0 h-20 items-center justify-center">
            <li className="inline-block mx-0 my-5 ">
              <a
                className="text-oxford-blue font-bold px-3.5"
                href="./pages/howToPlay.tsx"
              >
                How To Play
              </a>
            </li>
            <li className="inline-block mx-0 my-5 ">
              <a
                className="text-oxford-blue font-bold px-3.5"
                href="./pages/about.tsx"
              >
                About
              </a>
            </li>
            <li className="inline-block mx-0 my-5 ">
              <ConnectButton />
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex items-center justify-evenly min-h-[80vh]">
        <div>
          <h1 className="text-oxford-blue mx-1.5 my-12 text-6xl font-bold">
            Welcome to Joker Poker!
          </h1>
          <h2 className="mx-10">What game do you want to play?</h2>

          <div className="flex items-center justify-around flex-wrap">
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
      <footer className="text-oxford-blue flex flex-col items-center justify-center font-bold max-h-[20vh] text-2xl">
        <p>Made with &#9829; by Simon Samuel</p>
      </footer>
    </div>
  );
}

export default App;
