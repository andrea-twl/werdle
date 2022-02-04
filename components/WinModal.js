import Modal from "react-modal/lib/components/Modal";
import styles from "./WinModal.module.css";

const WinModal = ({ isOpen, setIsOpen, resetGame, triesCounter }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const closeAndReset = () => {
    closeModal();
    resetGame();
  };
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
  return (
    <Modal style={customStyles} isOpen={isOpen} ariaHideApp={false}>
      <h1 className={styles.header}>You Won!</h1>
      <p>You got the word in {triesCounter} tries.</p>
      <button
        className={styles.modal__button}
        id={styles.firstButton}
        onClick={closeAndReset}
      >
        NEXT WORD
      </button>
      <button
        className={styles.modal__button}
        id={styles.secondButton}
        onClick={closeModal}
      >
        RETURN
      </button>
    </Modal>
  );
};

export default WinModal;
