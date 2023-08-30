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
        const response = await WordSearchAPI.get("/"); //This takes the URL configured in MovieSearchAPI and adds "/" to the end before making a get request.
        setWords((prevState: any) => [...prevState, response.data.data.movies]);
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
          <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700">Word</td>
            <td className="p-3 text-sm text-gray-700">10000</td>
            <td className="p-3 text-sm text-gray-700">
              tag1, tag2, tag3, tag4, etc.
            </td>
            <td className="p-3 text-sm text-gray-700">
              <select
                aria-label="Select a playlist"
                className="border-2 border-gray-300 rounded p-1 pl-2 text-sm cursor-pointer"
              >
                <option key="watchlist">Favourites</option>
                <option key="watchlist">WordBank</option>
              </select>
            </td>
            <td className="p-3 text-sm text-gray-700">
              <button
                aria-label="Add movie to playlist"
                className="border-2 border-black rounded bg-black text-white text-sm p-1 pl-3 pr-3 hover:bg-white hover:text-black"
              >
                Add
              </button>
            </td>
          </tr>
          <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700">Word2</td>
            <td className="p-3 text-sm text-gray-700">20000</td>
            <td className="p-3 text-sm text-gray-700">
              tag1, tag2, tag3, tag4, etc.
            </td>
            <td className="p-3 text-sm text-gray-700">
              <select
                aria-label="Select a playlist"
                className="border-2 border-gray-300 rounded p-1 pl-2 text-sm cursor-pointer"
              >
                <option key="watchlist">Favourites</option>
                <option key="watchlist">WordBank</option>
              </select>
            </td>
            <td className="p-3 text-sm text-gray-700">
              <button
                aria-label="Add movie to playlist"
                className="border-2 border-black rounded bg-black text-white text-sm p-1 pl-3 pr-3 hover:bg-white hover:text-black"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WordsList;
