import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import InfoPage from "./routes/InfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<InfoPage />} />
      <Route path="/movies/:id/update" element={<UpdatePage />} />
      <Route path="*" element={<h2>404 Not Found!</h2>} />
    </Routes>
  );
}

export default App;
