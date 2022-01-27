// werdle grid not working

import { path } from "./path-data.js";
import { useState } from "react";
import Letter from "./Letter.js";
import styles from "./AttemptsDisplay.module.css";
import Word from "./ColouredAttempt.js";
import ColouredAttempt from "./ColouredAttempt.js";

const AttemptsDisplay = ({ colouredAttempts }) => {
  return (
    <>
      <div className={styles.gridWrapper}>
        {colouredAttempts.map((colouredAttempt, index) => (
          <ColouredAttempt key={index} attempt={colouredAttempt} />
        ))}
      </div>
    </>
  );
};

export default AttemptsDisplay;
