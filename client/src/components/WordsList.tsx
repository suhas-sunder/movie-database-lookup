import { useRef, useContext, useEffect } from "react";
import WordSearchAPI from "../apis/WordSearchAPI";
import { WordsContext } from "../context/WordsContext";

function WordsList({ searchResults, setSearchResults }: any) {
  const { words, setWords } = useContext(WordsContext);
  const renderRef = useRef(false);

  const handleAddToPlaylist = async (id: number) => {
    const targetWordData = searchResults.filter(
      (word: any) => word.id === id
    )[0];

    console.log(targetWordData)

    // Don't forget to combine the code below into one function and maybe switch statements for different playlists?
    // Check if word already exists in word bank. If not, add word to bank.
    if (!words.some((word: any) => word.word === targetWordData.word)) {
      try {
        // Update word on database through API endpoint on server
        const response = await WordSearchAPI.post(`/words`, {
          data: {
            word: targetWordData.word,
            score: targetWordData.score,
            tags: targetWordData.tags,
          },
        });
        setWords((prevState: any) => [...prevState, targetWordData]); //Update word in context state
      } catch (err) {
        console.log(err);
      }
    }

    // If a playlist is selected, check if word already exists in playlist. If not, add word to playlist.
  };

  // Load words data
  useEffect(() => {
    async function fetchData() {
      renderRef.current = true;
      try {
        const response = await WordSearchAPI.get("/words"); //This takes the URL configured in WordSearchAPI and adds "/" to the end before making a get request.
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

  const handleRemoveFromPlaylist = (id: number) => {};

  // Hide word from search results (removes it from list)
  const handleHideWord = async (id: number) => {
    setSearchResults(searchResults.filter((word: any) => word.id !== id));
  };

  // Set the current playlist for each word when toggled on the drop-down list in search results table
  const handlePlaylistSelection = (e: any, id: number) => {
    setSearchResults(
      searchResults.map((word: any) => {
        if (word.id === id) {
          return {
            id: id,
            word: word.word,
            score: word.score,
            tags: word.tags,
            currentPlaylist: e.target.value.toLowerCase(),
          };
        } else {
          return word;
        }
      })
    );
  };

  return (
    <div>
      <table className="table-auto">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Hide
            </th>
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
          {searchResults &&
            searchResults.map((word: any) => (
              <tr key={word.id} className="bg-white">
                <td className="p-3 text-sm text-gray-700">
                  <button
                    aria-label="Add word to playlist"
                    className="border-2 border-gray-700 bg-gray-700 text-white text-sm p-1 mr-1 w-full h-full hover:bg-white hover:text-gray-700 rounded-full "
                    onClick={() => handleHideWord(word.id)}
                  >
                    X
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-700">{word.word}</td>
                <td className="p-3 text-sm text-gray-700">{word.score}</td>
                <td className="p-3 text-sm text-gray-700">
                  {word.tags &&
                    word.tags
                      .map((tag: any, index: number) =>
                        index !== word.tags.length - 1
                          ? " " + tag + ","
                          : " " + tag
                      )
                      .join("")
                      .trim()}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <select
                    aria-label="Select a playlist"
                    className="border-2 border-gray-300 rounded p-1 pl-2 text-sm cursor-pointer"
                    onChange={(e) => handlePlaylistSelection(e, word.id)}
                  >
                    <option>WordBank</option>
                    <option>Favourites</option>
                  </select>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    aria-label="Add word to playlist"
                    className="border-2 border-green-700 rounded bg-green-700 text-white text-sm p-1 pl-3 pr-3 hover:bg-white hover:text-green-700"
                    onClick={() => handleAddToPlaylist(word.id)}
                  >
                    Add
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    aria-label="Add word to playlist"
                    className="border-2 border-red-700 rounded bg-red-700 text-white text-sm p-1 pl-3 pr-3 hover:bg-white hover:text-red-700"
                    onClick={() => handleRemoveFromPlaylist(word.id)}
                  >
                    Remove
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
