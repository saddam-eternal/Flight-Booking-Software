const db = require("../Models");
const PaymentStatus = db.payment_status;
const Op = db.Sequelize.Op;

// Create and Save a new Payment Status
exports.create = (req, res) => {

    // Create a Payment status
    const payment_status = {
        payment_status: req.body.payment_status,
        payment_due_date: req.body.payment_due_date,
        payment_amount: req.body.payment_amount,
        resevation_id: req.body.resevation_id,
        is_deleted: req.body.is_deleted ? req.body.is_deleted : false
    };

    // Save Passangers in the database
	PaymentStatus.create(payment_status).then(data => {

		const responseData = {
			message: 'Payment status created successfully',
			createdData: data,
			additionalInfo: 'In the Payment tabel data inserted'
		};
		res.send(responseData)

	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while creating the payment status."
		});
	});
};
