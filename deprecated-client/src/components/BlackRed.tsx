import React, { useRef, useState } from "react";
import styles from "../styles/Interface.module.css";
import Modal from "react-modal";
import { modalStyles } from "../utils/config";
import { blackRed, registerPlayer } from "../utils/games";
import { CardColor } from "../utils/types";

function BlackRed() {
  const [modalStatus, setModalStatus] = useState(false);
  const [guessedColor, setGuessedColor] = useState<CardColor | null>(null);

  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };

  return (
    <div>
      <button className={styles.game_button} onClick={toggleModal}>
        Black Red
      </button>
      <Modal
        isOpen={modalStatus}
        onRequestClose={toggleModal}
        contentLabel="Black Red"
        style={modalStyles}
        ariaHideApp={false}
      >
        <header className={styles.game_header}>
          <h1 className={styles.game_title}>Black Red</h1>
          <button onClick={toggleModal}>X</button>
        </header>

        <main>
          <form>
            <fieldset>
              <legend>
                <h2>Select your Color!</h2>
              </legend>
              <select>
                <option>Black</option>
                <option>Red</option>
              </select>
              <input type="submit"></input>
            </fieldset>
          </form>

          {/* <legend>
            <h2>Black Red</h2>
          </legend>
          <div>
            <p className={styles.game_description}>
              Guess the Color of the Random Card that will be generated on the
              Blockchain.
            </p>
            <p>Register here if you haven't: </p>
            <button onClick={registerPlayer}>Register Player</button>
          </div>

          <div>
            <p>Make your selection!</p>
            <button>Red</button>
            <button>Black</button>
          </div> */}
        </main>

        <footer>
          <p>Player Status</p>
        </footer>
      </Modal>
    </div>
  );
}

export default BlackRed;
