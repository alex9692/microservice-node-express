const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");

const { writePostsToFile, emptyFile } = require("./utils/write");
const { readPostsFromFile } = require("./utils/read");

const app = express();

app.use(express.json());

app.get("/posts", (req, res) => {
  res.status(200).json({
    status: "success",
    data: { posts: readPostsFromFile() },
  });
});

app.post("/posts", async (req, res) => {
  const { title } = req.body;
  const id = randomBytes(4).toString("hex");

  const post = { id, title };

  const posts = writePostsToFile(post);

  await axios.post("http://localhost:4005/events", {
    type: "POST_CREATED",
    data: {
      posts,
    },
  });

  res.status(201).json({
    status: "success",
    data: { post },
  });
});

app.post("/events", (req, res) => {
  console.log("Event received: ", req.body.type);
  res.send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Listening on PORT:4000");
});

function init() {
  emptyFile();
}

init();
