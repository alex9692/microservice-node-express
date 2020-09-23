const { readCommentsFromFile } = require("./read");
const fs = require("fs");
const path = require("path");

exports.writeCommentsToFile = (comment, postId) => {
  const comments = readCommentsFromFile(postId);
  const commentsByPost = comments[postId] ? comments[postId] : [];

  fs.writeFile(
    path.join(__dirname, "../../", "/dummy-data/comments.json"),
    JSON.stringify({ ...comments, [postId]: [...commentsByPost, comment] }),
    (err) => {
      if (err) return console.log(err);
      console.log("written successfully to the file");
    }
  );

  return { ...comments, [postId]: [...commentsByPost, comment] };
};

exports.emptyFile = () => {
  fs.writeFile(
    path.join(__dirname, "../../", "/dummy-data/comments.json"),
    "",
    (err) => {
      if (err) return console.log(err);
      console.log("written successfully to the file");
    }
  );
};

exports.updateCommentsInFile = (updatedComment, postId) => {
  const comments = readCommentsFromFile(postId);
  const commentsByPost = comments[postId];
  const comment = commentsByPost.find(
    (comment) => comment.id === updatedComment.id
  );
  comment.status = updatedComment.status;

  fs.writeFile(
    path.join(__dirname, "../../", "/dummy-data/comments.json"),
    JSON.stringify(comments),
    (err) => {
      if (err) return console.log(err);
      console.log("written successfully to the file");
    }
  );
  return comments;
};
