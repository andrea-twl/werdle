import { useEffect, useState } from "react";
import Axios from "axios";

import Intro from "../components/Intro";
import AttemptInput from "../components/AttemptInput";
import AttemptsDisplay from "../components/AttemptsDisplay";
import { COMMON_WORD_BANK } from "../words-five-common";
import WinModal from "../components/WinModal";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [colouredAttempts, setColouredAttempts] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [triesCounter, setTriesCounter] = useState(0);
  const [startStyle, setStartStyle] = useState({ display: "block" });
  const [otherStyle, setOtherStyle] = useState({ display: "none" });
  const [data, setData] = useState("");

  const handleStart = () => {
    newWord();
    setStartStyle({ display: "none" });
    setOtherStyle({ display: "grid" });
  };

  let blankArr = new Array(6).fill(
    new Array(5).fill({ letter: "", colour: "B" })
  );

  useEffect(() => {
    setColouredAttempts(blankArr);
    setTriesCounter(0);
  }, []);

  const colourAttempt = (attempt) => {
    let attemptArray = attempt.split("");
    let colouredArray = [];
    attemptArray.forEach((letter, index) => {
      letter = letter.toUpperCase();
      if (letter == currentWord[index]) {
        colouredArray[index] = { letter: letter, colour: "G" };
      } else if (currentWord.includes(letter)) {
        colouredArray[index] = { letter: letter, colour: "Y" };
      } else {
        colouredArray[index] = { letter: letter, colour: "R" };
      }
    });
    return colouredArray;
  };

  const addAttempt = (attempt) => {
    if (attempt == currentWord) {
      setIsWon(true);
    }
    let tempArr = colouredAttempts;
    tempArr[triesCounter] = colourAttempt(attempt);
    setColouredAttempts(tempArr);
    setTriesCounter(triesCounter + 1);
  };

  const getRandomInt = (n) => {
    return Math.floor(Math.random() * n);
  };

  const generateWord = () => {
    const arrLength = COMMON_WORD_BANK.length;
    let randomInt = getRandomInt(arrLength);
    setCurrentWord(COMMON_WORD_BANK[randomInt].toUpperCase());
    console.log("current word is: " + currentWord);
  };

  const newWord = () => {
    generateWord();
    setColouredAttempts(blankArr);
    setTriesCounter(0);
    checkDictionary();
  };

  const checkDictionary2 = () => {
    console.log("checking dictionary...");
    (async () => {
      try {
        await Axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/ywrr`
        ).then((response) => {
          console.log("is it array: " + Array.isArray(response.data[0]));
          console.log(response);
        });
      } catch (err) {
        console.log(
          "404 error: word not found in the free dictionary api that im using"
        );
        // newWord();
      }
    })();
  };

  const checkDictionary = () => {
    console.log("checking Dictionary...");
    (async () => {
      let apiRes = null;
      try {
        await Axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${currentWord}`
        ).then((response) => {
          setData(response.data[0].meanings[0].definitions[0].definition);
          console.log(data);
        });
      } catch (err) {
        setData(
          "404 error: word not found in the free dictionary api that im using"
        );
        // newWord();
      }
    })();
  };

  return (
    <div className={styles.container}>
      {currentWord}
      {data}
      <Intro />
      <button
        className={styles.main__button}
        onClick={handleStart}
        style={startStyle}
      >
        START
      </button>

      <div style={otherStyle}>
        <AttemptsDisplay
          colouredAttempts={colouredAttempts}
          newWord={newWord}
        />
        <AttemptInput addAttempt={addAttempt} />

        <button className={styles.main__button} onClick={checkDictionary}>
          HINT
        </button>
        <button className={styles.main__button} onClick={newWord}>
          NEXT WORD
        </button>

        <WinModal isOpen={isWon} setIsOpen={setIsWon} />
      </div>
    </div>
  );
}
