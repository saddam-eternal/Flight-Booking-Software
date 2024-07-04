const db = require("../Models");
const FlightDetails = db.flight_details;
const Op = db.Sequelize.Op;

// Create and Save a new Flight details
exports.create = (req, res) => {
   
    // Create a Flight details
    const flight_details = {
        source_airport_id: req.body.flight_details,
		passenger_id: req.body.passenger_id,
        source_location: req.body.source_location,
        destination_location: req.body.destination_location,
        departure_date_time: req.body.departure_date_time,
        arrival_date_time: req.body.arrival_date_time,
        airoplane_type: req.body.airoplane_type,
        is_deleted: req.body.is_deleted ? req.body.is_deleted : false
    };

    // Save Flight details in the database
	FlightDetails.create(flight_details).then(data => {

		const responseData = {
			message: 'Flight details created successfully',
			createdData: data,
			additionalInfo: 'In the Flight details tabel data inserted'
		};
		res.send(responseData)

	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the Flight details."
		});
	});
};
