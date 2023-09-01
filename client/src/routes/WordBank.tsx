import { useContext, useRef, useEffect } from "react";
import { WordsContext } from "../context/WordsContext";
import WordSearchAPI from "../apis/WordSearchAPI";
import WordsList from "../components/WordsList";
import Header from "../components/Header";

function WordBank() {
  const { words, setWords } = useContext(WordsContext);
  const renderRef = useRef(false);

  return (
    <div className="flex flex-col w-full justify-center items-center gap-20">
      <Header title={"Word Bank"} />
      <WordsList tableData={words} setTableData={setWords} hideOption={false} />
    </div>
  );
}

export default WordBank;
