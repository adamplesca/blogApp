const express = require("express");
const router = express.Router();
const db = require("../db/database");

//view posts (stored xss vulnerability)
router.get("/", (req, res) => {
  db.all("SELECT * FROM posts", (err, posts) => {
    res.render("posts", { posts });
  });
});

//create posts (stored xss vulner)
router.post("/create", (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    [req.session.user?.id || 1, title, content],
    () => res.redirect("/posts")
  );
});

module.exports = router;
