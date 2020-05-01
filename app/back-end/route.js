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
const userValidate = require("./controller/user/validate");

router.get("/user", Token, user.list);
router.get("/user/:id", Token, user.detail);
router.post("/user", Token, validate(userValidate.create), user.create);
router.put("/user/:id", Token, validate(userValidate.update), user.update);
router.put("/setting/:id", Token, validate(userValidate.updateSetting), user.update);
router.get("/user/:id/child", Token, user.count);
router.patch("/user/:id", Token, validate(userValidate.updateStatus), user.updateStatus);
router.delete("/user/:id", Token, user.remove);
router.post("/resend", Token, user.resend);

const payment = require("./controller/payment");
const paymentValidate = require("./controller/payment/validate");

router.get("/payment", Token, payment.list);
router.post("/payment", Token, validate(paymentValidate.create), payment.create);
router.put("/payment/:id", Token, validate(paymentValidate.create), payment.update);


module.exports = router;
