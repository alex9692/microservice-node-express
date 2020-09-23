const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

let posts = {};

const handleEvents = (type, data) => {
  switch (type) {
    case "POST_CREATED":
      for (let key in data.posts) {
        posts[key] = { ...data.posts[key], comments: [] };
      }
      break;
    case "COMMENT_CREATED":
      for (let key in posts) {
        let post = posts[key];
        posts[key] = {
          ...post,
          comments: [...data.comments[key]],
        };
      }
      break;
    case "COMMENT_UPDATED":
      for (let key in posts) {
        let post = posts[key];
        posts[key] = {
          ...post,
          comments: [...data.comments[key]],
        };
      }
    default:
      break;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).json({ posts });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvents(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on PORT:4002");

  const res = await axios.get("http://localhost:4005/events");
  const { events } = res.data;
  events.forEach((event) => {
    const { type, data } = event;
    handleEvents(type, data);
  });
  console.log(posts,events);
});
