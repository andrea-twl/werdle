import styles from "./Letter.module.css";

const Letter = ({ className, letter }) => {
  return <div className={`${styles.letter} ${className}`}>{letter}</div>;
};

export default Letter;
