const express = require("express");
const router = express.Router();
const flightDetail = require("../Controllers/flightDetailController");
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { flightDetailsSchema } = require('../JoiValidation/validationSchemas');
		

// Create a new flight detail
router.post("/create", commonFunctionValidation(flightDetailsSchema), flightDetail.create);
  
module.exports = router