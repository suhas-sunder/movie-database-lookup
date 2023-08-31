import React from "react";

function WordBank() {
   // Load playlist data
  // useEffect(() => {
  //   async function fetchData() {
  //     renderRef.current = true;
  //     try {
  //       const response = await WordSearchAPI.get("/words"); //This takes the URL configured in WordSearchAPI and adds "/" to the end before making a get request.
  //       setWords((prevState: any) => [
  //         ...prevState,
  //         ...response.data.data.words,
  //       ]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   !renderRef.current && fetchData(); //Checking renderRef stops axios from running twice.
  // }, []);
  
  return <div>WordBank</div>;
}

export default WordBank;
