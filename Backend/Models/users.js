const shortUUID = require('short-uuid');
const translator = shortUUID();

const UsersModel = (sequelize, DataTypes) => {

    const Users = sequelize.define("users", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
    });

    return Users;
};

module.exports = UsersModel;