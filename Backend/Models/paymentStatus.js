const shortUUID = require('short-uuid');
const translator = shortUUID();

const PaymentStatusModel = (sequelize, DataTypes) => {

    const PaymentStatus = sequelize.define("payment_status", {

        payment_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => translator.new()
        },
        payment_status: {
            type: DataTypes.ENUM,
            values: ['Yes', 'No'],
            defaultValue: 'No',
        },
        payment_due_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        payment_amount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        resevation_id: {
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

    return PaymentStatus;
};

module.exports = PaymentStatusModel;