const express = require("express");
const router = express.Router();
const controllers = require("../controllers/collegeController");

router.get("/test", function (req, res) {
  res.send("working");
});

router.post("/colleges", controllers.createCollege);

module.exports = router;
