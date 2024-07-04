const db = require("../Models");
const Passengers = db.passengers;
const FlightDetails = db.flight_details;
const sequelize = db.sequelize //Its import for due to sequelize transaction
const Op = db.Sequelize.Op;
let transaction;
const QRCode = require('qrcode')



// Create and Save a new Passengers
exports.create = (req, res) => {

    // Create a Passengers
    const passengers = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact_number: req.body.contact_number,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
        is_deleted: req.body.is_deleted ? req.body.is_deleted : false
    };

    // Save Passengers in the database
    Passengers.create(passengers).then(data => {
        res.send(data);
    }).catch(err => {
        console.log("🚀 >>>>>> err:", err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Passengers."
        });
    });

};

exports.getPassengerFlighReport = async (req, res) => {
    try {
        const passengerId = req.params.id;

        const passengerFlightDetail = await Passengers.findOne({
            where: {
                id: passengerId,
                is_deleted: false
            },
            attributes: [
                'first_name',
                'last_name',
                'email',
                'contact_number',
                'address',
                'city',
                'state',
                'zipcode'
            ],
            include: [
                {
                    model: FlightDetails,
                    attributes: [
                        'passenger_id',
                        'source_location',
                        'destination_location',
                        'departure_date_time',
                        'arrival_date_time',
                        'airoplane_type'
                    ]
                }

            ]
        });

        const mappedPassengerFlightDetail = (passengerFlightDetail) => ({
            'first_name': passengerFlightDetail.first_name,
            'last_name': passengerFlightDetail.last_name,
            'email': passengerFlightDetail.email,
            'contact_number': passengerFlightDetail.contact_number,
            'address': passengerFlightDetail.address,
            'city': passengerFlightDetail.city,
            'state': passengerFlightDetail.state,
            'zipcode': passengerFlightDetail.zipcode,
            'passenger_id': passengerFlightDetail.flight_details[0].passenger_id,
            'source_location': passengerFlightDetail.flight_details[0].source_location,
            'destination_location': passengerFlightDetail.flight_details[0].destination_location,
            'departure_date_time': passengerFlightDetail.flight_details[0].departure_date_time,
            'arrival_date_time': passengerFlightDetail.flight_details[0].arrival_date_time,
            'airoplane_type': passengerFlightDetail.flight_details[0].airoplane_type
        });

        const passangersFlightPDF = mappedPassengerFlightDetail(passengerFlightDetail);

        let data = {
            "First Name": passangersFlightPDF.first_name,
            "Last Name": passangersFlightPDF.last_name,
            "Mobile No.": passangersFlightPDF.contact_number,
            "Source Location": passangersFlightPDF.source_location,
            "Destination Location": passangersFlightPDF.destination_location
        }
        let stringdata = JSON.stringify(data)

        const qrcodeData = QRCode.toString(stringdata,
            function (error, QRcode) {

                if (error) return console.log("error",error.message)
                return QRcode;
            })
        console.log("🚀 >>>>>> exports.getPassengerFlighReport= >>>>>> qrcodeData:", qrcodeData)




        const ResponseData = {
            Message: `Passenger's flight details report.`,
            "Data": passengerFlightDetail,
            // "Qr Code": qrcodeData,
            AdditionalInfo: 'In this API two tables association used.'
        };

        if (ResponseData) {
            res.status(201).json({ ResponseData });
        } else {
            res.status(404).send({ message: 'Passenger flight detail not found' });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log("🚀 >>>>>> exports.getPassengerFlighReport= >>>>>> error.message:", error.message)
    }
};

exports.flightBookByPassanger = async (req, res) => {

    try {

        // Start a transaction
        const transaction = await sequelize.transaction();

        const bookingInformation = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            contact_number: req.body.contact_number,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            source_location: req.body.source_location,
            destination_location: req.body.destination_location,
            departure_date_time: req.body.departure_date_time,
            arrival_date_time: req.body.arrival_date_time,
            airoplane_type: req.body.airoplane_type,
            is_deleted: req.body.is_deleted ? req.body.is_deleted : false
        };

        const passangersData = await Passengers.create(bookingInformation, { transaction });

        const flightBookData = await FlightDetails.create(
            { ...bookingInformation, passenger_id: passangersData.id },
            { transaction });

        // Commit the transaction
        await transaction.commit();

        const ResponseData = {
            Message: `Passenger's flight details report.`,
            "Passanger Detail": passangersData,
            "Flight details": flightBookData,
            AdditionalInfo: 'Passangers and flight detalis successful inserted.'
        };

        res.status(201).json({ ResponseData });

    } catch (error) {

        if (transaction) {
            await transaction.rollback();
        }

        console.log("🚀 >>>>>> error:", error)
        res.status(500).send({
            message: error.message || "Some erroror occurred while creating the Passengers."
        });
    }
}
