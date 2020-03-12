const express = require("express");
const router = express.Router();
const validate = require("express-validation");
const Token = require("../helper/token");

// admin
const admin = require("./controller/admin");

router.post("/login", validate(admin.login.Validate), admin.login.handler);
router.post("/init", admin.init.handler);

// user router
const user = require("./controller/user");

router.get("/user", Token, user.list.handler);
router.get("/user/:id", Token, user.detail.handler);
router.post("/user", Token, validate(user.create.Validate), user.create.handler);
router.put("/user/:id", Token, validate(user.update.Validate), user.update.handler);


module.exports = router;
