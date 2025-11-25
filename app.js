const express = require("express");
const session = require("express-session");
const path = require("path");
const db = require("./db/database");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const domxssRoutes = require("./routes/domxss");

const app = express();

//set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//midware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/domxss", domxssRoutes);

//session (insecure version)
app.use(
  session({
    secret: "insecure-secret",
    resave: false,
    saveUninitialized: true,
  })
);

//routes
app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/", require("./routes/auth"));


//default route for /
app.get("/", (req, res) => {
  res.redirect("/login"); //redirect to login page
});

//server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
