const express = require('express');
const router = express.Router();
const passengersController = require('../Controllers/passengersController');
const commonFunctionValidation = require('../JoiValidation/commonFunctionValidation');
const { passangerSchema } = require('../JoiValidation/validationSchemas');

// Create a new passenger
router.post('/create', commonFunctionValidation(passangerSchema), passengersController.create);
router.post('/flight-book-passanger', passengersController.flightBookByPassanger);

router.get('/passanger-flight-detail/:id', passengersController.getPassengerFlighReport);


module.exports = router;