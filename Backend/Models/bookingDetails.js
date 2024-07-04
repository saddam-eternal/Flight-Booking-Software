const shortUUID = require('short-uuid');
const translator = shortUUID();


const BookingDetailsModel = (sequelize, DataTypes) => {

    const BookingDetails = sequelize.define("booking_details", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => translator.new(),
        },
        travel_class: {
            type: DataTypes.ENUM,
			values: ['Economy', 'Premium Economy', 'Business', 'First Class'],
            defaultValue: 'Economy',
            allowNull: true
        },
        date_of_resevation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        booking_no: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
		cost: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        service: {
            type: DataTypes.ENUM,
			values: ['Food', 'No Food', 'Only Chocklate'],
            defaultValue: 'No Food',
            allowNull: true
        },
        flight_model_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
		passanger_model_id: {
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
    return BookingDetails;
};

module.exports = BookingDetailsModel;