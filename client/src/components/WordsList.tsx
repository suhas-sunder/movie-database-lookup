import { useEffect, useRef, useContext } from "react";
import WordSearchAPI from "../apis/WordSearchAPI";
import { WordsContext } from "../context/WordsContext";

function WordsList() {
  const renderRef = useRef(false);
  const { words, setWords } = useContext(WordsContext);

  useEffect(() => {
    async function fetchData() {
      renderRef.current = true;
      try {
        const response = await WordSearchAPI.get("/"); //This takes the URL configured in WordSearchAPI and adds "/" to the end before making a get request.
        setWords((prevState: any) => [
          ...prevState,
          ...response.data.data.words,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
    !renderRef.current && fetchData(); //Checking renderRef stops axios from running twice.
  }, []);

  return (
    <div>
      <table className="table-auto">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Word
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Score
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Tags
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Playlist
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {words && words.map((word: any) => (
            <tr key={word.id} className="bg-white">
              <td className="p-3 text-sm text-gray-700">{word.word}</td>
              <td className="p-3 text-sm text-gray-700">{word.score}</td>
              <td className="p-3 text-sm text-gray-700">
                {word.tags
                  .map((tag: any, index: number) =>
                    index !== word.tags.length - 1 ? " " + tag + "," : " " + tag
                  )
                  .join("")
                  .trim()}
              </td>
              <td className="p-3 text-sm text-gray-700">
                <select
                  aria-label="Select a playlist"
                  className="border-2 border-gray-300 rounded p-1 pl-2 text-sm cursor-pointer"
                >
                  <option>Favourites</option>
                  <option>WordBank</option>
                </select>
              </td>
              <td className="p-3 text-sm text-gray-700">
                <button
                  aria-label="Add word to playlist"
                  className="border-2 border-black rounded bg-black text-white text-sm p-1 pl-3 pr-3 hover:bg-white hover:text-black"
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;
