const express = require("express");
const router = express.Router();
const booking_details = require("../Controllers/bookingDetailController");
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { bookingDetailsSchema } = require('../JoiValidation/validationSchemas');
		

// Create a new booking details
router.post("/create", commonFunctionValidation(bookingDetailsSchema), booking_details.singleDataCreate);
  
module.exports = router