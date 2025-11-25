const express = require("express");
const router = express.Router();
const db = require("../db/database");

//login page
router.get("/login", (req, res) => {
    res.render("login", { msg: req.query.msg || "" });
});

// insecure login form
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    //purposfully vulnerable sql injection
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

    db.get(query, (err, user) => {
        if (err) {
            console.log("SQL Error:", err);
            return res.send("Database error");
        }

        if (!user) {
            return res.send("Login failed");
        }

        req.session.user = user;
        res.redirect("/posts");
    });
});


//register page
router.get("/register", (req, res) => {
    res.render("register");
});

//insecure register submission
router.post("/register", (req, res) => {
    const { email, password } = req.body;

    //vulnerable sql injection
    const sql = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;

    db.run(sql, function(err) {
        if (err) {
            console.error("Registration error:", err);
            return res.send("Error creating account");
        }
        res.redirect("/login");
    });
});

module.exports = router;
