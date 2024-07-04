const shortUUID = require('short-uuid');
const translator = shortUUID();

const RolesModel = (sequelize, DataTypes) => {

    const Roles = sequelize.define("roles", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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

    return Roles;
};

module.exports = RolesModel;