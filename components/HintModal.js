import Modal from "react-modal/lib/components/Modal";
import styles from "./HintModal.module.css";

const HintModal = ({ data, hintIsOpen, setHintIsOpen }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      marginRight: "-50%",
      width: "80vmin",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(31, 33, 37)",
      border: "none",
      textAlign: "center",
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      // justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
  };

  const closeModal = () => {
    setHintIsOpen(false);
  };
  return (
    <Modal style={customStyles} isOpen={hintIsOpen} ariaHideApp={false}>
      <h1 className={styles.header}>Hint</h1>
      <p>{data}</p>

      <button className={styles.modal__button} onClick={closeModal}>
        RETURN
      </button>
    </Modal>
  );
};

export default HintModal;
