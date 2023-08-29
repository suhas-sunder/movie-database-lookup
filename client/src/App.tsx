import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import InfoPage from "./routes/InfoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/update" element={<UpdatePage />} />
      <Route path="*" element={<h2>404 Not Found!</h2>} />
    </Routes>
  );
}

export default App;
