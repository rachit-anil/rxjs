import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

const FAKE_DATA = {
  message: "A message from node",
};
const TIME_DELAY = 0;

app.get("/storeCount", (req, res) => {
  setTimeout(() => {
    res.send("Count Stored");
  }, TIME_DELAY);
});

app.get("/addBook", (req, res) => {
  setTimeout(() => {
    res.send({
      id: 1,
      title: "Rachit Biography",
      author: "Rachit",
    });
  }, TIME_DELAY);
});

app.get("/fruits", (req, res) => {
  res.send(["Orange", "Banana", "Apricot", "Apple", "Guava"]);
});

// Function to get a random joke
function getRandomJoke() {
  const jokes = [
    {
      value: {
        joke: "Why don't scientists trust atoms? Because they make up everything!",
      },
    },
    {
      value: {
        joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
      },
    },
    {
      value: {
        joke: "Why don't programmers like nature? It has too many bugs.",
      },
    },
    {
      value: {
        joke: "Why do cows have hooves instead of feet? Because they lactose.",
      },
    },
    {
      value: {
        joke: "Why can't you give Elsa a balloon? Because she will let it go.",
      },
    },
    {
      value: {
        joke: "Why did the math book look sad? Because it had too many problems.",
      },
    },
    {
      value: { joke: "Why was the stadium so cool? It was filled with fans." },
    },
    { value: { joke: "What do you call fake spaghetti? An impasta." } },
    {
      value: {
        joke: "Why did the bicycle fall over? Because it was two-tired.",
      },
    },
    {
      value: {
        joke: "Why don't some couples go to the gym? Because some relationships don't work out.",
      },
    },
  ];
  const randomIndex = Math.floor(Math.random() * jokes.length);
  console.log(`Random index: ${randomIndex}`);
  return jokes[randomIndex];
}

// Endpoint to get a random joke
app.get("/getJokes", (req, res) => {
  setTimeout(() => {
    const joke = getRandomJoke();
    res.json(joke);
  }, TIME_DELAY);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
