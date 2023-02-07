import React, { useState } from "react";
import styles from "../styles/Interface.module.css";
import Modal from "react-modal";

function HigherLower() {
  const [modalStatus, setModalStatus] = useState(false);

  function toggleModal() {
    setModalStatus(!modalStatus);
  }

  return (
    <div>
      <button className={styles.game_button}>Higher Lower</button>
    </div>
  );
}

export default HigherLower;
