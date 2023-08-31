const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const datamuse_api = process.env.DATAMUSE_API_KEY;
const cors = require("cors");
const db = require("./db");
const request = require("request");

// // Middleware - Should be defined at the top, or it will simply run the route handler and skip this.
// // The next function tells our middleware where to pass request (Either next middleware, or route handler)
// app.use((req, res, next) => {
//   console.log("middleware running");
//   next();
// });

// middleware for cors - npm i cors is needed too
//Since two different domains can't talk to each other without this, using axios to fetch data from our back-end API will throw an error.
app.use(cors());

// A built-in middleware for express that parses incoming requests with JSON payloads and is based on body-parser
// It takes the json object and converts it into a standard object in JavaScript.
// Without this, req.body property will not work in the post request below.
app.use(express.json());

//Handle client requests to datamuse API
app.post("/api/v1/datamuse/search", async (req, res) => {
  console.log("test");

  if (req.body.data.text) {
    request(
      `https://api.datamuse.com/words?ml=${req.body.data.text}&max=10`,
      async (error, response, body) => {
        if (response.statusCode === 200) {
          try {
            const results = await db.query("SELECT * FROM words");

            res.status(201).json({
              status: "ok",
              results: body.length, //It is good practice to return the total number of results being returned
              data: {
                words: body,
              },
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log(error);
        }
      }
    );
  }
});

// Get request for all words
app.get("/api/v1/wordsearch/words", async (req, res) => {
  // With express, anytime you have async await, wrap it in a try catch block.
  try {
    const results = await db.query("SELECT * FROM words");

    // res.send("the results are words") //This sends a response back in the form of plain text, but we want JSON instead.
    res.status(200).json({
      status: "ok",
      results: results.rows.length, //It is good practice to return the total number of results being returned
      data: {
        words: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get request for all playlists
app.get("/api/v1/wordsearch/playlists", async (req, res) => {
  // With express, anytime you have async await, wrap it in a try catch block.
  try {
    const results = await db.query("SELECT * FROM playlists");

    // res.send("the results are words") //This sends a response back in the form of plain text, but we want JSON instead.
    res.status(200).json({
      status: "ok",
      results: results.rows.length, //It is good practice to return the total number of results being returned
      data: {
        words: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a word
//The callback function in this is called a route handler. Thats the (req, res) => {} part of the code. It has a request and response object.
//When you check an id example id=123 where the url ends with /api/v1/words/123, then it is stored under params within the request object. So doing req.params should show { id: '33' }
app.get("/api/v1/wordsearch/words/:id", async (req, res) => {
  try {
    // const results = await db.query(`SELECT * FROM restaurants where id = ${req.params.id}`); //DOING THIS IS BAD. Will make your code vulnerable to SQL attacks. Use parameterized query instead.
    const results = await db.query("SELECT * FROM words where id = $1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        word: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/v1/wordsearch/playlists/:id", async (req, res) => {
  try {
    // const results = await db.query(`SELECT * FROM restaurants where id = ${req.params.id}`); //DOING THIS IS BAD. Will make your code vulnerable to SQL attacks. Use parameterized query instead.
    const results = await db.query("SELECT * FROM playlists where id = $1", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: {
        playlists: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a word
app.post("/api/v1/wordsearch/words/:id", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO words (word, score, tags) VALUES ($1, $2, $3) returning *",
      [req.body.word, req.body.score, req.body.tags]
    );

    res.status(201).json({
      status: "success",
      data: {
        words: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/wordsearch/playlists/:id", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO words (name, word_ids) VALUES ($1, $2) returning *",
      [req.body.name, req.body.word_ids]
    );

    res.status(201).json({
      status: "success",
      data: {
        playlists: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update existing word(s)
app.put("/api/v1/wordsearch/words/:id", async (req, res) => {
  const results = await db.query(
    "UPDATE words SET word = $1, score = $2, tags = $3 WHERE id = $4 returning *",
    [req.body.word, req.body.score, req.body.tags, req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: {
      word: results.rows[0],
    },
  });
});

app.put("/api/v1/wordsearch/words/:id", async (req, res) => {
  const results = await db.query(
    "UPDATE words SET name = $1, word_ids = $2 WHERE id = $3 returning *",
    [req.body.name, req.body.word_ids, req.params.id]
  );

  res.status(200).json({
    status: "success",
    data: {
      word: results.rows[0],
    },
  });
});

// Delete existing word(s)
app.delete("/api/v1/wordsearch/words/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM words where id = $1", [
      req.params.id,
    ]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete existing playlist(s)
app.delete("/api/v1/wordsearch/playlists/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM playlists where id = $1", [
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
