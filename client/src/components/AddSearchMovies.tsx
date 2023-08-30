import React from "react";

function AddSearchMovies() {
  return (
    <form className="flex m-20 gap-10">
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
      
      <button
        aria-label="Search for movie"
        className="border-2 border-black rounded bg-black text-white text-xl p-2 pl-4 pr-4"
      >
        Search
      </button>
    </form>
  );
}

export default AddSearchMovies;
