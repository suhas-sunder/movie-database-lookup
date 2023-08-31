import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex w-full m-100 bg-slate-600 text-white gap-x-96 justify-center text-xl p-3">
      <Link to="/" className="hover:underline hover:underline-offset-4">Home</Link>
      <Link to="/wordbank" className="hover:underline hover:underline-offset-4">Word Bank</Link>
      <Link to="/favourites" className="hover:underline hover:underline-offset-4">Favourites</Link>
    </div>
  );
}

export default NavBar;
