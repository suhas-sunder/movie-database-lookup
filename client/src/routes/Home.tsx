import { useState } from "react";
import Header from "../components/Header";
import AddSearchWords from "../components/AddSearchWords";
import WordsList from "../components/WordsList";

type SearchArr = {
  id: number;
  word: string;
  score: number;
  tags: string;
  currentPlaylist: string;
};

function Home() {
  const [searchResults, setSearchResults] = useState<SearchArr[]>([]); //Keeps track of words searched using datamuse API

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header />
      <AddSearchWords setSearchResults={setSearchResults} />
      <WordsList
        setTableData={setSearchResults}
        tableData={searchResults}
        hideOption={true}
        playlistOption={true}
      />

      <p className="mt-20 max-w-2xl">
        Search for words and store them in either the word bank or favourites
        playlist for future reference. Each playlist can be viewed and managed
        on its own page by navigating using the nav-bar above.
      </p>
    </div>
  );
}

export default Home;
