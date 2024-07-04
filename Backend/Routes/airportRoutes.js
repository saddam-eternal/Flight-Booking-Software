const express = require("express");
const router = express.Router();
const airport = require("../Controllers/airportController");
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { airportSchema } = require('../JoiValidation/validationSchemas');

// Create a new airport
router.post("/airport-flight-create", airport.create);
router.post("/create",commonFunctionValidation(airportSchema), airport.singleDataCreate);
  
module.exports = router