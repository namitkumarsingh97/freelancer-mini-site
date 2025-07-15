const express = require("express");
const router = express.Router();
const { createUserSite } = require("../controllers/userController");

router.post("/create", createUserSite);

module.exports = router;
