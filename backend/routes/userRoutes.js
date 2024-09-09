const {findUser} = require("../controllers/userController");
const {findLoginCredential} = require("../controllers/tokenController");
const express = require("express");
const router = express.Router();

router.post("/findUser",findUser);
router.post("/findLoginCredential",findLoginCredential);

module.exports = router;