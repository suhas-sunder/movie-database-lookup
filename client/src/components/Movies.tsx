import React from "react";

function Movies() {
  return (
    <div>
      <table className="table-auto">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Title
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Genre
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Year
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Rating
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Plot
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
            <td className="p-3 text-sm text-gray-700">Title</td>
            <td className="p-3 text-sm text-gray-700">Genre</td>
            <td className="p-3 text-sm text-gray-700">1990</td>
            <td className="p-3 text-sm text-gray-700">5</td>
            <td className="p-3 text-sm text-gray-700">
              This is the plot of the movie. Lots of information here. Clearly
              it will be a short paragraph and not just one or two words.
            </td>
            <td className="p-3 text-sm text-gray-700">
              <select
                aria-label="Select a playlist"
                className="border-2 border-gray-300 rounded p-1 pl-2 text-sm"
              >
                <option key="watchlist">Watchlist</option>
              </select>
            </td>
            <td className="p-3 text-sm text-gray-700">
              <button
                aria-label="Add movie to playlist"
                className="border-2 border-black rounded bg-black text-white text-sm p-1 pl-3 pr-3"
              >
                Add
              </button>
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="p-3 text-sm text-gray-700">Title</td>
            <td className="p-3 text-sm text-gray-700">Genre</td>
            <td className="p-3 text-sm text-gray-700">1990</td>
            <td className="p-3 text-sm text-gray-700">5</td>
            <td className="p-3 text-sm text-gray-700">
              This is the plot of the movie. Lots of information here. Clearly
              it will be a short paragraph and not just one or two words.
            </td>
            <td className="p-3 text-sm text-gray-700">
              <select
                aria-label="Select a playlist"
                className="border-2 border-gray-300 rounded p-1 pl-2 text-sm"
              >
                <option key="watchlist">Watchlist</option>
              </select>
            </td>
            <td className="p-3 text-sm text-gray-700">
              <button
                aria-label="Add movie to playlist"
                className="border-2 border-black rounded bg-black text-white text-sm p-1 pl-3 pr-3"
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

export default Movies;
