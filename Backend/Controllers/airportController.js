const db = require("../Models");
const Op = db.Sequelize.Op;
const Airport = db.airport;
const FlightDetails = db.flight_details;

exports.create = async (req, res) => {
    try {

        const airportData = req.body[0].airport;

        const airport = await Airport.create(airportData);

        const flightDetailsData = {
            airoplane_type: req.body[0].flight_details.airoplane_type,
            source_airport_id: airport.airport_id
        };

        const flightDetails = await FlightDetails.create(flightDetailsData);

        const ResponseData = {
            message: 'Flight and Airports are created successfully',
            "Data : 1": airport,
            "Data : 2": flightDetails,
            additionalInfo: 'In this API two tables association used.'
        };

        res.status(201).json({ResponseData});

    } catch (error) {
        console.error('Error creating airport and flight details:', error);
        res.status(500).json({ error: 'Failed to create airport and flight details' });
    }
};

exports.singleDataCreate = async (req, res) => {
    try {

        const airportData = req.body;

        const airport = await Airport.create(airportData);

        const ResponseData = {
            message: 'Flight Detail is created successfully',
            "Data 1": airport,
            additionalInfo: 'ALL THE DATA IS CREATED.'
        };

        res.status(201).json({ ResponseData });

    } catch (error) {
        console.error('Error creating airport and flight details:', error);
        res.status(500).json({ error: 'Failed to create airport and flight details' });
    }
};
