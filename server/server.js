const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3100;
const db = require("./db");

// // Middleware - Should be defined at the top, or it will simply run the route handler and skip this.
// // The next function tells our middleware where to pass request (Either next middleware, or route handler)
// app.use((req, res, next) => {
//   console.log("middleware running");
//   next();
// });

// A built-in middleware for express that parses incoming requests with JSON payloads and is based on body-parser
// It takes the json object and converts it into a standard object in JavaScript.
// Without this, req.body property will not work in the post request below.
app.use(express.json());

// Get request for all movies
app.get("/api/v1/movies", async (req, res) => {
  // With express, anytime you have async await, wrap it in a try catch block.
  try {
    const results = await db.query("SELECT * FROM movies");

    // res.send("the results are movies") //This sends a response back in the form of plain text, but we want JSON instead.
    res.status(200).json({
      status: "ok",
      results: results.rows.length, //It is good practice to return the total number of results being returned
      data: {
        movies: results.rows,
      },
    });
    console.log("get movie");
  } catch (err) {
    console.log(err);
  }
});

//Get a Movie
//The callback function in this is called a route handler. Thats the (req, res) => {} part of the code. It has a request and response object.
//When you check an id example id=123 where the url ends with /api/v1/movies/123, then it is stored under params within the request object. So doing req.params should show { id: '33' }
app.get("/api/v1/movies/:id", async (req, res) => {
  try {
    // const results = await db.query(`SELECT * FROM restaurants where id = ${req.params.id}`); //DOING THIS IS BAD. Will make your code vulnerable to SQL attacks. Use parameterized query instead.
    const results = await db.query("SELECT * FROM movies where id = $1", [
      req.params.id,
    ]);

    console.log(results.rows);

    res.status(200).json({
      status: "success",
      data: {
        movie: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a movie
app.post("/api/v1/movies/:id", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO movies (title, genre, plot, rating) VALUES ($1, $2, $3, $4) returning *",
      [req.body.title, req.body.genre, req.body.plot, req.body.rating]
    );

    res.status(201).json({
      status: "success",
      data: {
        movie: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update existing movie(s)
app.put("/api/v1/movies/:id", async (req, res) => {
  const results = await db.query(
    "UPDATE movies SET title = $1, genre = $2, plot = $3, rating = $4 WHERE id = $5 returning *",
    [
      req.body.title,
      req.body.genre,
      req.body.plot,
      req.body.rating,
      req.params.id,
    ]
  );

  res.status(200).json({
    status: "success",
    data: {
      movie: results.rows[0],
    },
  });
});

// Delete existing movie(s)
app.delete("/api/v1/movies/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM movies where id = $1", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Express.js function used to bind and listen to the connections on the specified host and port. This method is identical to Node’s http.Server.listen() method.
//If the port number is omitted or is 0, the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}.`);
});
