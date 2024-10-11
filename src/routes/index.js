const express = require("express");
const userRoute = require("./user.routes");
const blogRoute = require("./blog.routes");

const router = express.Router();

router.use("/user",userRoute);
router.use("/blog",blogRoute);



module.exports = router;
