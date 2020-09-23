const fs = require("fs");
const path = require("path");

exports.readPostsFromFile = () => {
  const posts = fs.readFileSync(
    path.join(__dirname, "../../", "/dummy-data/posts.json"),
    "utf8"
  );
  return posts ? JSON.parse(posts) : {};
};
