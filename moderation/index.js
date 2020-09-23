const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "COMMENT_CREATED") {
    const status = data.comment.content.includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_MODERATED",
      data: {
        ...data,
        comment: {
          ...data.comment,
          status,
        },
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on PORT:4003");
});
