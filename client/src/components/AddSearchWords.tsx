import React from "react";

function AddSearchWords() {
  return (
    <form className="flex m-20 gap-10 items-center">
      <label className="text-2xl">Word Search:</label>
      <input
        aria-label="search for words"
        placeholder="enter text"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      />
      {/* <button
        aria-label="Search for related words"
        className="border-2 border-black rounded bg-black text-white text-xl p-2 pl-4 pr-4"
      >
        Search
      </button> */}
    </form>
  );
}

export default AddSearchWords;
