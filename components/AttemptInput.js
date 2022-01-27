import styles from "./AttemptInput.module.css";
import { useState, useEffect, isValidElement } from "react";
import { WORD_BANK } from "../words-five";

function AttemptInput({ addAttempt }) {
  /*
  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter") {
        console.log("Enter key was pressed. Run your function.");
        e.preventDefault();
        handleEnter(e);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  */
  const [attempt, setAttempt] = useState("");

  const handleEnter = (e) => {
    e.preventDefault();
    if (attempt.trim() && isValid(attempt)) {
      addAttempt(attempt);
    }
    setAttempt("");
  };

  const handleInputChange = (e) => {
    setAttempt(e.target.value.toUpperCase());
  };

  const isValid = (word) => {
    return WORD_BANK.includes(word);
  };
  return (
    <>
      <form onSubmit={handleEnter}>
        <input
          type="text"
          value={attempt}
          spellCheck="false"
          className={styles.inputField}
          onChange={handleInputChange}
          placeholder="START GUESSING"
        />
      </form>
    </>
  );
}

export default AttemptInput;
