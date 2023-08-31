import React from "react";

function AddSearchWords() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form className="flex m-20 gap-5 items-center">
      <label className="text-2xl">Word Search:</label>
      <input
        aria-label="search for words"
        placeholder="enter text"
        className="border-2 border-black rounded text-xl p-2 pl-4 "
      />
      <button onClick={handleSubmit}>SUBMIT</button>
    </form>
  );
}

export default AddSearchWords;
