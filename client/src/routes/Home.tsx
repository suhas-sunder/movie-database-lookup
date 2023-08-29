import React from "react";
import Header from "../components/Header";
import AddSearchMovies from "../components/AddSearchMovies";

function Home() {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Header />
      <AddSearchMovies />
    </div>
  );
}

export default Home;
