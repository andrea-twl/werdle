import { useState } from "react";
import Modal from "react-modal/lib/components/Modal";
import styles from "./LoseModal.module.css";

const LoseModal = ({ isOpen, setIsOpen, setIsOpenReveal, revealModal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      width: "70vmin",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(31, 33, 37)",
      border: "none",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRevealWord = () => {
    setIsOpen(false);
    setIsOpenReveal(true);
  };

  return (
    <>
      <Modal style={customStyles} isOpen={isOpen} ariaHideApp={false}>
        <h1 className={styles.header}>You&apos;re out of tries!</h1>
        <p>What the hell!</p>

        <button
          className={styles.modal__button}
          id={styles.firstButton}
          onClick={closeModal}
        >
          KEEP TRYING
        </button>
        <button
          className={styles.modal__button}
          id={styles.secondButton}
          onClick={handleRevealWord}
        >
          REVEAL WORD
        </button>
      </Modal>
      {revealModal}
    </>
  );
};

export default LoseModal;
