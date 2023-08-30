import { useState, createContext } from "react";

export const WordsContext = createContext();

export const WordsContextProvider = (props) => {
  const [words, setWords] = useState([]);

  return (
    <WordsContext.Provider value={{ words, setWords }}>
      {props.children}
    </WordsContext.Provider>
  );
};
