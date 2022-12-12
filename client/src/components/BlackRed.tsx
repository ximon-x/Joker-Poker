import React, { useState } from "react";
import styles from "../styles/Interface.module.css";
import Modal from "react-modal";
import { IoExitOutline } from "react-icons/all";

const customStyles = {
  content: {
    top: "15%",
    left: "5%",
    right: "5%",
    bottom: "20%",
    background: "#e5e5e5",
    color: "#14213d",
  },
};

function BlackRed() {
  const [modalStatus, setModalStatus] = useState(false);

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
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>Yo! Simon</h2>
        <button onClick={toggleModal}>X</button>
      </Modal>
    </div>
  );
}

export default BlackRed;
