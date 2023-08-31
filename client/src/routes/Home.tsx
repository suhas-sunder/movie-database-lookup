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
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
    </div>
  );
}

export default Home;
