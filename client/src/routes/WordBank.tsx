import { useContext, useRef, useEffect } from "react";
import { WordsContext } from "../context/WordsContext";
import WordSearchAPI from "../apis/WordSearchAPI";
import WordsList from "../components/WordsList";

function WordBank() {
  const { words, setWords } = useContext(WordsContext);
  const renderRef = useRef(false);

  // Load playlist data
  useEffect(() => {
    async function fetchData() {
      renderRef.current = true;
      try {
        const response = await WordSearchAPI.get("/words"); //This takes the URL configured in WordSearchAPI and adds "/" to the end before making a get request.
        setWords(response.data.data.words);
      } catch (err) {
        console.log(err);
      }
    }
    !renderRef.current && fetchData(); //Checking renderRef stops axios from running twice.
  }, []);

  return (
    <div className="flex w-full justify-center mt-40 ">
      <WordsList tableData={words} setTableData={setWords} hideOption={false} />
    </div>
  );
}

export default WordBank;
