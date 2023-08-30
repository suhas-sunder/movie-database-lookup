import { useState, createContext } from "react";

export const PlaylistContext = createContext();

export const PlaylistContextProvider = (props) => {
  const [playlists, setPlaylists] = useState([]);

  return (
    <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
      {props.children}
    </PlaylistContext.Provider>
  );
};
