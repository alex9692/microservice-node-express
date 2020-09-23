const fs = require("fs");
const path = require("path");

const readCommentsFromFile = () => {
  const comments = fs.readFileSync(
    path.join(__dirname, "../../", "/dummy-data/comments.json"),
    "utf-8"
  );
  return comments ? JSON.parse(comments) : {};
};
const readCommentsByPostsFromFile = (postId) => {
  const comments = readCommentsFromFile();
  return comments[postId] ? comments[postId] : [];
};

module.exports = {
  readCommentsFromFile,
  readCommentsByPostsFromFile,
};
