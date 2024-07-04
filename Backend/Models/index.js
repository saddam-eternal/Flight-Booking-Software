const Sequelize = require("sequelize");

const dbConnection = require("../Database/db.js");

const sequelize = new Sequelize(dbConnection.DB, dbConnection.USER, dbConnection.PASSWORD, {
    host: dbConnection.HOST,
    dialect: dbConnection.dialect,
    dialectOptions: dbConnection.dialectOptions,
    operatorsAliases: 0,
    pool: {
        max: dbConnection.pool.max,
        min: dbConnection.pool.min,
        acquire: dbConnection.pool.acquire,
        idle: dbConnection.pool.idle
    }
});

/******************************************************/
/*🚀🚀🚀🚀All the model import is given below 🚀🚀🚀🚀*/
/******************************************************/
const Passengers = require("./passengers.js");
const Airport = require("../Models/airport");
const PaymentStatus = require("../Models/paymentStatus.js");
const FlightDetails = require("../Models/flightDetails");
const BookingDetails = require("../Models/bookingDetails.js");
const Users = require("../Models/users");
const Roles = require("../Models/roles.js");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/******************************************************/
/*🚀🚀🚀🚀All the model call the function here🚀🚀🚀🚀*/
/******************************************************/

db.passengers = Passengers(sequelize, Sequelize);
db.airport = Airport(sequelize, Sequelize);
db.payment_status = PaymentStatus(sequelize, Sequelize);
db.flight_details = FlightDetails(sequelize, Sequelize);
db.booking_details = BookingDetails(sequelize, Sequelize);
db.users = Users(sequelize, Sequelize);
db.roles = Roles(sequelize, Sequelize);

/******************************************************/
/*🚀🚀All the model Sequelize association is here🚀🚀*/
/******************************************************/
db.airport.hasMany(db.flight_details, { foreignKey: 'source_airport_id' });
db.flight_details.belongsTo(db.airport, { foreignKey: 'source_airport_id' });

db.passengers.hasMany(db.flight_details, { foreignKey: 'passenger_id', sourceKey: 'id' });
db.flight_details.belongsTo(db.passengers, { foreignKey: 'passenger_id', sourceKey: 'id' });

db.roles.belongsToMany(db.users, {
    through: "user_roles"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles"
});

// db.passengers.belongsToMany(db.flight_details, {
//     through: "passenger_id"
// });
// db.flight_details.belongsToMany(db.passengers, {
//     through: "passenger_id"
// });



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;





