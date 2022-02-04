import { useEffect, useState } from "react";
import Axios from "axios";

import Intro from "../components/Intro";
import AttemptInput from "../components/AttemptInput";
import AttemptsDisplay from "../components/AttemptsDisplay";
import { COMMON_WORD_BANK } from "../words-five-common";
import { WORDLE_BANK } from "../wordle-bank";
import WinModal from "../components/WinModal";
import HintModal from "../components/HintModal";
import LoseModal from "../components/LoseModal";
import RevealModal from "../components/RevealModal";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [colouredAttempts, setColouredAttempts] = useState([]);
  const [isOpenWin, setIsOpenWin] = useState(false);
  const [triesCounter, setTriesCounter] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [definition, setdefinition] = useState("No definition yet.");
  const [isOpenHint, setIsOpenHint] = useState(false);
  const [isOpenLose, setIsOpenLose] = useState(false);
  const [isOpenReveal, setIsOpenReveal] = useState(false);

  let blankArr = new Array(6).fill(
    new Array(5).fill({ letter: "", colour: "B" })
  );

  useEffect(() => {
    setColouredAttempts(blankArr);
    setTriesCounter(0);
    resetGame();
  }, []);

  useEffect(() => {
    setdefinition("Checking dictionary...");
    checkDictionary();
    console.log("should have set as check dictionary");
  }, [currentWord]);

  const colourAttempt = (attempt) => {
    let attemptArray = attempt.split("");
    let currentArray = currentWord.split("");

    let colouredArray = [];

    // colour all matching letters green first
    attemptArray.forEach((letter, index) => {
      if (letter == currentArray[index]) {
        console.log("match");
        colouredArray[index] = { letter: letter, colour: "G" };
        currentArray[index] = "*";
      }
    });

    // check for yellow and red letters
    attemptArray.forEach((letter, index) => {
      if (colouredArray[index] != null) {
        // already green, do nothing
      } else if (currentArray.includes(letter)) {
        console.log("yellow");
        colouredArray[index] = { letter: letter, colour: "Y" };
        currentArray[currentArray.indexOf(letter)] = "*";
      } else {
        colouredArray[index] = { letter: letter, colour: "R" };
      }
    });
    return colouredArray;
  };

  const addAttempt = (attempt) => {
    if (attempt == currentWord) {
      setIsOpenWin(true);
      setHasWon(true);
    }
    if (triesCounter == 5) {
      setIsOpenLose(true);
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
    const arrLength = WORDLE_BANK.length;
    const randomInt = getRandomInt(arrLength);
    const randomWord = WORDLE_BANK[randomInt].toUpperCase();
    setCurrentWord(randomWord);
    console.log("Previous word is: " + currentWord);
  };

  const resetGame = () => {
    generateWord();
    setColouredAttempts(blankArr);
    setTriesCounter(0);
    setHasWon(false);
  };

  const checkDictionary = () => {
    console.log("checking Dictionary...");
    (async () => {
      let apiRes = null;
      try {
        await Axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en_US/${currentWord}`
        ).then((response) => {
          setdefinition(
            response.definition[0].meanings[0].definitions[0].definition
          );
          console.log(definition);
        });
      } catch (err) {
        setdefinition(
          <div>
            <p>Word not found in the free dictionary api that I'm using.</p>
            <p>
              This means that either the word is{" "}
              <span style={{ color: "red" }}>damn weird</span> or there's a{" "}
              <span style={{ color: "red" }}>problem accessing the site</span>.
            </p>
            <p>Try again if you'd like.</p>
          </div>
        );
      }
    })();
  };

  const nextWordButton = (
    <button className={styles.main__button} onClick={resetGame}>
      NEXT WORD
    </button>
  );

  const handleGiveUp = () => {
    setIsOpenReveal(true);
  };
  const giveUpButton = (
    <button className={styles.main__button} onClick={handleGiveUp}>
      GIVE UP
    </button>
  );

  const [button, setButton] = useState(giveUpButton);

  useEffect(() => {
    if (hasWon) {
      setButton(nextWordButton);
    } else {
      setButton(giveUpButton);
    }
  }, [hasWon]);

  const openHintModal = () => {
    checkDictionary();
    setIsOpenHint(true);
  };

  const revealModal = (
    <RevealModal
      isOpen={isOpenReveal}
      setIsOpen={setIsOpenReveal}
      word={currentWord}
      resetGame={resetGame}
    />
  );

  return (
    <div className={styles.container}>
      <Intro />
      <AttemptsDisplay colouredAttempts={colouredAttempts} />
      <AttemptInput addAttempt={addAttempt} />

      <button className={styles.main__button} onClick={openHintModal}>
        HINT
      </button>
      {button}
      <WinModal
        isOpen={isOpenWin}
        setIsOpen={setIsOpenWin}
        resetGame={resetGame}
        triesCounter={triesCounter}
      />
      <HintModal
        definition={definition}
        isOpen={isOpenHint}
        setIsOpen={setIsOpenHint}
      />
      <LoseModal
        isOpen={isOpenLose}
        setIsOpen={setIsOpenLose}
        revealModal={revealModal}
        setIsOpenReveal={setIsOpenReveal}
      />
    </div>
  );
}
