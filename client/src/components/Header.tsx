import React from "react";

type DataType = {
  title: string;
};

function Header({ title }: DataType) {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <h1 className="text-8xl mt-20">{title}</h1>
    </div>
  );
}

export default Header;
