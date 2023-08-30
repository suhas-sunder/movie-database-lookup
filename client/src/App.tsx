import { Routes, Route } from "react-router-dom";

// Components
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import InfoPage from "./routes/InfoPage";
import { MoviesContextProvider } from "./context/MoviesContext";
import { PlaylistContextProvider } from "./context/PlaylistContext";

function App() {
  return (
    <PlaylistContextProvider>
      <MoviesContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<InfoPage />} />
          <Route path="/movies/:id/update" element={<UpdatePage />} />
          <Route path="*" element={<h2>404 Not Found!</h2>} />
        </Routes>
      </MoviesContextProvider>
    </PlaylistContextProvider>
  );
}

export default App;
