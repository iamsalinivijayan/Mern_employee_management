const express = require("express");
const router = express.Router();

const { signUp, logIn, logOut } = require("../controllers/userController");

router.route("/logout").get(logOut);
router.route("/admin/signup").post(signUp);
router.route("/login").post(logIn);

module.exports = router;
