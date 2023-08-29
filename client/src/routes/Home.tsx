import React from "react";
import Header from "../components/Header";
import AddSearchMovies from "../components/AddSearchMovies";
import Movies from "../components/Movies";

function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header />
      <AddSearchMovies />
      <Movies />
    </div>
  );
}

export default Home;
