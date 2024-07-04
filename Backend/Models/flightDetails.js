const shortUUID = require('short-uuid');
const translator = shortUUID();
const db = require("../Models");
const Passengers = db.passengers;

const FlightDetailsModel = (sequelize, DataTypes) => {

    const FlightDetails = sequelize.define("flight_details", {
        flight_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => translator.new()
        },
        source_airport_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passenger_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: Passengers,
                key: 'id'
            }
        },
        source_location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        destination_location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        departure_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        arrival_date_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        airoplane_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
        {
            timestamps: true,
        });
    return FlightDetails;
};

module.exports = FlightDetailsModel;