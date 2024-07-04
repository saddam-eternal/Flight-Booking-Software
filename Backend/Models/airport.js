const shortUUID = require('short-uuid');
const translator = shortUUID();

const AirportModel = (sequelize, DataTypes) => {

    const Airport = sequelize.define("airports", {

        airport_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => translator.new(),
        },
        airport_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        airport_city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        airport_country: {
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

    return Airport;
};

module.exports = AirportModel;