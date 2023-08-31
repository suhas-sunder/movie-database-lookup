import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import DataMuseAPI from "../apis/DataMuseAPI";

function AddSearchWords({ setSearchResults }: any) {
  const inputRef = useRef<any>(null);

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

        // If words were fetched successfully, save in context state
        setSearchResults(
          wordsData.map((data: any) => ({
            id: uuidv4(),
            word: data.word,
            score: data.score,
            tags: data.tags,
            currentPlaylist: "wordbank",
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

    //Can I memoize this if input value ends up being the same?
    searchTerms ? fetchSearchData(searchTerms) : setSearchResults([]); //Search for words as long as input is not empty, otherwise clear words.
  };

  return (
    <>
      <div className="flex m-20 mb-15 gap-5 items-center">
        <label className="text-2xl">Word Search:</label>
        <input
          ref={inputRef}
          onChange={handleInputChange}
          aria-label="search for words"
          placeholder="text"
          className="border-2 border-gray-200 rounded text-xl p-2 pl-4 "
        />
      </div>
    </>
  );
}

export default AddSearchWords;
