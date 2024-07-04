const express = require("express");
const router = express.Router();
const paymentStatus = require("../Controllers/paymentStatusController");
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { paymentStatusSchema } = require('../JoiValidation/validationSchemas');

// Create a new payment status
router.post("/create", commonFunctionValidation(paymentStatusSchema), paymentStatus.create);
  

module.exports = router