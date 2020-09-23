const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");

const {
  writeCommentsToFile,
  emptyFile,
  updateCommentsInFile,
} = require("./utils/write");
const {
  readCommentsByPostsFromFile,
  readCommentsFromFile,
} = require("./utils/read");

const app = express();

app.use(express.json());

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: "success",
    data: { commentsByPost: readCommentsByPostsFromFile(id) },
  });
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  const comment = {
    id: randomBytes(4).toString("hex"),
    content,
    status: "pending",
  };

  const comments = writeCommentsToFile(comment, id);

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      comment,
      postId: id,
      comments,
    },
  });

  res.status(201).json({
    status: "success",
    data: { comment },
  });
});

app.use("/events", async (req, res) => {
  console.log("Event received: ", req.body.type);

  const { type, data } = req.body;

  if (type === "COMMENT_MODERATED") {
    console.log(data);
    const comments = updateCommentsInFile(data.comment, data.postId);
    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_UPDATED",
      data: {
        ...data,
        comments,
      },
    });
  }

  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Listening on PORT:4001");
});

function init() {
  emptyFile();
}

init();
