import { useState } from "react";

import { path } from "./path-data.js";

const LetterDisplay = ({ word }) => {
  const [letters, setLetters] = useState("");

  return (
    <>
      For debugging sake:
      <p>{word}</p>
    </>
  );
};

export default LetterDisplay;
