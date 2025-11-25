const express = require("express");
const router = express.Router();

//insecure domxss demo page
router.get("/", (req, res) => {
    res.render("domxss");
});

module.exports = router;
