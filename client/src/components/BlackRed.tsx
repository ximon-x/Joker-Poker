import React, { useState } from "react";
import styles from "../styles/Interface.module.css";
import Modal from "react-modal";

function BlackRed() {
  const [modalStatus, setModalStatus] = useState(false);

  function toggleModal() {
    setModalStatus(!modalStatus);
  }

  return (
    <div>
      <button className={styles.game_button}>Black Red</button>
    </div>
  );
}

export default BlackRed;
