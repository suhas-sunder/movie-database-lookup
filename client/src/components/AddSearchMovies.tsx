import React from "react";

function AddSearchMovies() {
  return (
    <form className="flex m-40 gap-10">
      <input
        aria-label="search by movie title"
        placeholder="title"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      />
      <input
        aria-label="search by genre"
        placeholder="genre"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      />
      <input
        aria-label="search by year"
        placeholder="year"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      />
      <select
        aria-label="Select a playlist"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      >
        <option key="watchlist">Watchlist</option>
      </select>
      <button
        aria-label="Add movie to playlist"
        className="border-2 border-black rounded bg-black text-white text-xl p-2 pl-4 pr-4"
      >
        Add
      </button>
    </form>
  );
}

export default AddSearchMovies;
