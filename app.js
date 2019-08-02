const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const cors = require('cors');
const Posts = require('./models/posts');
// const Sequelize = require("sequelize");

const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/posts", async (req, res) => {
  let post = await Posts.findAll().then((posts) => {
      res.json(posts);
  });
});

app.get("/api/posts/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let post = await Posts.findByPk(id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
  // Posts.findByPk(id).then((post) => {
  //   if (post) {
  //       res.json(post);
  //   } else {
  //       res.status(404).send();
  //   }
  // });
});

app.post("/api/posts", async (req, res) => {
  try {
    let post = await Posts.create({
      image: req.body.image,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
      comment: req.body.comment
    });
    res.send(post)
  } catch (error) {
    res.status(422).json(error)
  });


app.put("/api/posts/:id", async (req, res) => {
  try {
    let post = await Posts.update({
      image: req.body.image,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
      comment: req.body.comment
    })
    res.send(post)
  } catch (error) {
    res.status(422).json(error)
  });


app.delete("/api/posts/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let post = await Posts.findByPk(id);
    if (post) {
      await post.setTracks([]);
      await post.destroy();
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send();
  }
});


app.listen(5000, function() {
  console.log("Server started on port 5000");
});
