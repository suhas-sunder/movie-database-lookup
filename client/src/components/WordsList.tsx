import { useEffect, useRef, useContext, useState } from "react";
import WordSearchAPI from "../apis/WordSearchAPI";
import { WordsContext } from "../context/WordsContext";

function WordsList({ searchResults, setSearchResults }: any) {
  const renderRef = useRef(false);

  const handleAddToPlaylist = (id: number) => {
    // Add word to words wordbank
    // Add id to relevant playlist
    console.log(id);
  };

  const handleDeleteWord = async (id: number) => {
    // Remove word from playlist but not wordbank.
    // Remove word from word bank if deleted from word bank directly.
    // Removing from wordbank will remove words from all playlists. Display a modal to confirm action.

    // try {
    //   // Delete word from database
    //   const response = await WordSearchAPI.delete(`/words/${id}`); //This takes the URL configured in WordSearchAPI and adds "/" to the end before making a get request.

    //   if (response.status === 204) {
    //     // Delete word from state
    //     setWords(words.filter((word: any) => word.id !== id));
    //   } else {
    //     console.log(
    //       `Could not delete word from database. Response status code ${response.status}`
    //     );
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    setSearchResults(searchResults.filter((word: any) => word.id !== id));
    console.log(id);
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
                    onClick={() => handleDeleteWord(word.id)}
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
