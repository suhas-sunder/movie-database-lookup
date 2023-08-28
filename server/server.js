const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3100;

// // Middleware - Should be defined at the top, or it will simply run the route handler and skip this.
// // The next function tells our middleware where to pass request (Either next middleware, or route handler)
// app.use((req, res, next) => {
//   console.log("middleware running");
//   next();
// });

// A built-in middleware for express that parses inoming requests with JSON payloads and is based on body-parser
// It takes the json object and converts it into a standard object in JavaScript.
// Without this, req.body property will not work in the post request below.
app.use(express.json());

// Get request for all movies
app.get("/api/v1/movies", (req, res) => {
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
//When you check an id example id=123 where the url ends with /api/v1/movies/123, then it is stored under params within the request object. So doing req.params should show { id: '33' }
app.get("/api/v1/movies/:id", (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: "success",
    data: {
      movie: "Blade",
    },
  });
});

// Create a movie
app.post("/api/v1/movies/:id", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      movie: "Blade",
    },
  });
});

// Update existing movie(s)
app.put("/api/v1/movies/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      movie: "Blade",
    },
  });
});

// Delete existing movie(s)
app.delete("/api/v1/movies/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

// Express.js function used to bind and listen to the connections on the specified host and port. This method is identical to Node’s http.Server.listen() method.
//If the port number is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}.`);
});
