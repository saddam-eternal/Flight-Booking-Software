const shortUUID = require('short-uuid');
const translator = shortUUID(); // Initialize the short-uuid translator

const PassengersModel = (sequelize, DataTypes) => {

    const Passengers = sequelize.define("passengers", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => translator.new(), // Generate a new short UUID
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contact_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
        {
            timestamps: true,
        });
    return Passengers;
};

module.exports = PassengersModel;
