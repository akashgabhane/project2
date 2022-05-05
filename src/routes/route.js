const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")


//const blogController = require("../controllers/internController")
//const middleware = require("../middleware/middleware")



router.post("/college", collegeController.createCollege)

//router.post("/intern", internController.createintern)

module.exports = router;