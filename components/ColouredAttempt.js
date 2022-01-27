import { path } from "./path-data.js";
import { useState } from "react";
import Letter from "./Letter.js";
import styles from "./ColouredAttempt.module.css";

const colouredAttempt = ({ attempt }) => {
  let colouredAttempt = attempt.map((letter, index) => {
    if (letter.colour == "G") {
      return (
        <Letter
          key={index}
          letter={letter.letter}
          className={styles.letter__green}
        />
      );
    } else if (letter.colour == "Y") {
      return (
        <Letter
          key={index}
          letter={letter.letter}
          className={styles.letter__yellow}
        />
      );
    } else if (letter.colour == "B") {
      return (
        <Letter
          key={index}
          letter={letter.letter}
          className={styles.letter__blank}
        />
      );
    } else {
      return (
        <Letter
          key={index}
          letter={letter.letter}
          className={styles.letter__red}
        />
      );
    }
  });

  // setIndicator2(indicator);
  return <div>{colouredAttempt}</div>;
};

export default colouredAttempt;
