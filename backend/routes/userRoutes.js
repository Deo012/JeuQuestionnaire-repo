const {findUser} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.post("/findUser",findUser);

module.exports = router;