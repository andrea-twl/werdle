import { useEffect, useState } from "react";
import Axios from "axios";

import Intro from "../components/Intro";
import AttemptInput from "../components/AttemptInput";
import AttemptsDisplay from "../components/AttemptsDisplay";
import { COMMON_WORD_BANK } from "../words-five-common";
import WinModal from "../components/WinModal";

import styles from "../styles/Home.module.css";
import HintModal from "../components/HintModal";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [colouredAttempts, setColouredAttempts] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [triesCounter, setTriesCounter] = useState(0);
  const [data, setData] = useState("No definition yet.");
  const [hintIsOpen, setHintIsOpen] = useState(false);

  let blankArr = new Array(6).fill(
    new Array(5).fill({ letter: "", colour: "B" })
  );

  useEffect(() => {
    setColouredAttempts(blankArr);
    setTriesCounter(0);
    resetGame();
  }, []);

  useEffect(() => {
    setData("Checking dictionary...");
    checkDictionary();
  }, [currentWord]);
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

  const resetGame = () => {
    generateWord();
    setColouredAttempts(blankArr);
    setTriesCounter(0);
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
          <div>
            <p>Word not found in the free dictionary api that I'm using.</p>
            <p>
              This means that either the word is{" "}
              <span style={{ color: "red" }}>damn weird</span> or there's a{" "}
              <span style={{ color: "red" }}>connection problem</span>.
            </p>
            <p>Try again to rule out connection problems.</p>
          </div>
        );
      }
    })();
  };

  const openHintModal = () => {
    checkDictionary();
    setHintIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <Intro />
      <AttemptsDisplay colouredAttempts={colouredAttempts} />
      <AttemptInput addAttempt={addAttempt} />

      <button className={styles.main__button} onClick={openHintModal}>
        HINT
      </button>
      <button className={styles.main__button} onClick={resetGame}>
        NEXT WORD
      </button>

      <WinModal isOpen={isWon} setIsOpen={setIsWon} />
      <HintModal
        data={data}
        hintIsOpen={hintIsOpen}
        setHintIsOpen={setHintIsOpen}
      />
    </div>
  );
}
