import React, { useState } from "react";
import styles from "../styles/Interface.module.css";
import Modal from "react-modal";
import { modalStyles } from "../utils/config";
import { CardColor } from "../utils/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerPlayer } from "../utils/games";

interface IFormInput {
  color: CardColor;
}

function BlackRed() {
  const [modalStatus, setModalStatus] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();

  const toggleModal = () => {
    setModalStatus(!modalStatus);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.color === CardColor.Black ? console.log("black") : console.log("red");
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
        <header className="flex items-center justify-between">
          <h1 className="text-center text-orange-web mx-1 text-6xl">
            Black Red
          </h1>
          <button
            className="bg-white text-oxford-blue w-48 h-16 px-2 py-5"
            onClick={registerPlayer}
          >
            Register Here!
          </button>
        </header>

        <main className="block">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <h2 className="text-2xl text-oxford-blue mx-1 px-10 text-center">
                Select your Color!
              </h2>
              <select {...register("color")}>
                <option value="black">Black</option>
                <option value="red">Red</option>
              </select>
              <input type="submit" />
            </fieldset>
          </form>
        </main>

        <footer></footer>
      </Modal>
    </div>
  );
}

export default BlackRed;
