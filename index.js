import express from "express";

const app = express();
const port = 3000;
let authorList = [];
let postList = [];
let allPosts = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(createPostList);

class Post {
  constructor(author, postText) {
    this.author = author;
    this.postText = postText;
  };
};

function createPostList(req, res, next) {
  allPosts = [];
  for (let i=0; i < authorList.length; i++) {
    let post = new Post(authorList[i], postList[i]);
    allPosts.push(post);
  };
  next();
};

app.get("/", (req, res) => {
  res.render("index.ejs", { allPosts });
});

app.get("/create_post", (req, res) => {
  res.render("create_post.ejs", { allPosts });
});

app.post("/submit", (req, res) => {
  authorList.push(req.body.name);
  postList.push(req.body['post-text']);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
