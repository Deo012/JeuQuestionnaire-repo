const {getAllQuestions} = require("../controllers/questionController")
const express = require("express");
const router = express.Router();

router.get("/getAllQuestions", getAllQuestions)

module.exports = router;