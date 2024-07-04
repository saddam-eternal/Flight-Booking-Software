const db = require("../Models");
const moment = require("moment");
const Op = db.Sequelize.Op;
const BookingDetails = db.booking_details;

exports.singleDataCreate = async (req, res) => {
    try {

        function generateRandom5DigitNumber() {
            const min = 10000;//Generate in between % digit 
            const max = 99999;
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNumber = generateRandom5DigitNumber();
        const monthName = moment().format('MMMM').toUpperCase();
        const year = moment().format('YYYY');
        const bookingNo = monthName + year + "AIR" + randomNumber //Random booking number generate
        const todayDate = moment().format('Do MMMM YYYY'); 

        const BookingDetailsData = {
            travel_class: req.body.travel_class,
            date_of_resevation: todayDate, //Insert into generate number
            booking_no: bookingNo, //Insert into todays date 
            city: req.body.city,
            cost: req.body.cost,
            service: req.body.service,
            flight_model_id: req.body.flight_model_id,
            passanger_model_id: req.body.passanger_model_id,
            is_deleted: req.body.is_deleted ? req.body.is_deleted : false
        };

        const booking_details = await BookingDetails.create(BookingDetailsData);

        const ResponseData = {
            message: 'Booking Detail is created successfully',
            "Data 1": booking_details,
            additionalInfo: 'ALL THE DATA AS WELL AS RANDOM GENERATE NUMBER AND TODAYS DATE IS INSERTED.'
        };

        res.status(201).json({ ResponseData });

    } catch (error) {
        console.error('Error creating booking details and flight details:', error);
        res.status(500).json({ error: 'Failed to create booking details' });
    }
};