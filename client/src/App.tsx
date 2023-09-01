import { Routes, Route } from "react-router-dom";

// Components
import Home from "./routes/Home";
import Favourites from "./routes/Favourites";
import { WordsContextProvider } from "./context/WordsContext";
import { PlaylistContextProvider } from "./context/PlaylistContext";
import WordBank from "./routes/WordBank";
import NavBar from "./components/NavBar";

function App() {
  return (
    <PlaylistContextProvider>
      <WordsContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wordbank" element={<WordBank />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </WordsContextProvider>
    </PlaylistContextProvider>
  );
}

export default App;
