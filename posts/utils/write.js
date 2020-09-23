const { readPostsFromFile, readCommentsFromFile } = require("./read");
const fs = require("fs");
const path = require("path");

exports.writePostsToFile = (post) => {
  const posts = readPostsFromFile();

  fs.writeFile(
    path.join(__dirname, "../../", "/dummy-data/posts.json"),
    JSON.stringify({ ...posts, [post.id]: post }),
    (err) => {
      if (err) return console.log(err);
      console.log("written successfully to the file");
    }
  );
  return { ...posts, [post.id]: post };
};

exports.emptyFile = () => {
  fs.writeFile(
    path.join(__dirname, "../../", "/dummy-data/posts.json"),
    "",
    (err) => {
      if (err) return console.log(err);
      console.log("written successfully to the file");
    }
  );
};
