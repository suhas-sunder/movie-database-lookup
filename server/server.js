const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3100;

app.get("/getMovies", (req, res) => {
  // res.send("the results are movies") //This sends a response back in the form of plain text, but we want JSON instead.
  res.status(200).json({
    status: "ok",
    data: {
      movies: ["Bourne Ultimatum", "Star Wars: The Last Jedi"],
    },
  });
  console.log("get movie");
});

//Get a Movie
//The callback function in this is called a route handler. Thats the (req, res) => {} part of the code. It has a request and response object.
app.get("/api/v1/movies/:id", (req, res) => {
  console.log(req);
});

// Express.js function used to bind and listen to the connections on the specified host and port. This method is identical to Node’s http.Server.listen() method.
//If the port number is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}.`);
});
