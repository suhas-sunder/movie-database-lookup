import { useRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DataMuseAPI from "../apis/DataMuseAPI";
import { WordsContext } from "../context/WordsContext";

function AddSearchWords() {
  const inputRef = useRef<any>(null);
  const { words, setWords } = useContext(WordsContext);

  // Fetch data from Datamuse API
  const fetchSearchData = async (searchStr: string) => {
    try {
      const response = await DataMuseAPI.post("/search", {
        data: {
          text: searchStr,
        },
      });

      if (response.data.status === "ok") {
        const wordsData = JSON.parse(response.data.data.words);
        console.log(wordsData);

        // If words were fetched successfully, save in context state
        setWords(
          wordsData.map((data: any) => ({
            id: uuidv4(),
            word: data.word,
            score: data.score,
            tags: data.tags,
          }))
        );
      } else {
        console.log("Failed to fetch data from datamuse");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = () => {
    const searchTerms = inputRef.current.value.trim().split(" ").join("+");

    //Can I memoize this?
    searchTerms ? fetchSearchData(searchTerms) : setWords([]); //Search for words as long as input is not empty, otherwise clear words.
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className="flex m-20 gap-5 items-center">
      <label className="text-2xl">Word Search:</label>
      <input
        ref={inputRef}
        onChange={handleInputChange}
        aria-label="search for words"
        placeholder="text"
        className="border-2 border-gray-200 rounded text-xl p-2 pl-4 "
      />
      <button onClick={handleSubmit}>SUBMIT</button>
    </form>
  );
}

export default AddSearchWords;
