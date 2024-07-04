const passengersRoutes = require("./passengersRoutes");
const airportsRoutes = require("./airportRoutes");
const paymentStatusRoutes = require("./paymentStatusRoutes");
const flightDetailsRoutes = require("./flightDetailsRoutes");
const bookingDetailRoutes = require("./bookingDetailRoutes");
const roleBasedRoutes = require("./roleBasedRoutes");
const signInOutRoutes = require("./signInOutRoutes");


//Routes 
module.exports = function (app) {

	app.use("/passengers", passengersRoutes);
	app.use("/airports", airportsRoutes);
	app.use("/payment-status", paymentStatusRoutes);
	app.use("/flight-details", flightDetailsRoutes);
	app.use("/booking-details", bookingDetailRoutes);
	app.use("/role", roleBasedRoutes);
	app.use("/authentication", signInOutRoutes);
}