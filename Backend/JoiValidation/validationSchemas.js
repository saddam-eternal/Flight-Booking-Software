const Joi = require('joi');

const passangerSchema = Joi.object()
    .keys({
        first_name: Joi.string().min(3).max(30).optional(),
        last_name: Joi.string().min(3).max(30).optional(),
        email: Joi.string().email().optional(),
        contact_number: Joi.string().length(10).pattern(/^[6-9][0-9]{9}$/).optional(),
        address: Joi.string().min(3).max(30).optional(),
        city: Joi.string().min(3).max(15).optional(),
        state: Joi.string().optional(),
        zipcode: Joi.number().integer().optional(),
        country: Joi.string().optional()
    });

const airportSchema = Joi.object()
    .keys({
        airport_name: Joi.string().min(3).max(15).optional(),
        airport_city: Joi.string().min(3).max(15).optional(),
        airport_country: Joi.string().min(3).max(15).optional()
    });

const bookingDetailsSchema = Joi.object()
    .keys({
        travel_class: Joi.string().valid('Economy', 'Premium Economy', 'Business', 'First Class').default('Economy').optional(),
        date_of_resevation: Joi.date().greater(new Date("1940-01-01")).required(),
        booking_no: Joi.string().min(3).max(15).optional(),
        city: Joi.string().min(3).max(15).optional(),
        cost: Joi.number().integer().optional(),
        service: Joi.string().valid('Food', 'No Food', 'Only Chocklate').default('No Food').optional(),
        flight_model_id: Joi.string().optional(),
        passanger_model_id: Joi.string().optional(),
    });

const flightDetailsSchema = Joi.object()    
    .keys({
        source_airport_id: Joi.string().optional(),
        passenger_id: Joi.string().optional(),
        source_location: Joi.string().min(3).max(15).optional(),
        destination_location: Joi.string().min(3).max(15).optional(),
        departure_date_time: Joi.date().greater(new Date("1940-01-01")).required(),
        arrival_date_time: Joi.date().greater(new Date("1940-01-01")).required(),
        airoplane_type: Joi.string().min(3).max(15).optional(),
    });

const paymentStatusSchema = Joi.object()
    .keys({
        payment_status: Joi.string().valid('Yes', 'No').default('No').optional(),
        payment_due_date: Joi.date().greater(new Date("1940-01-01")).required(),
        payment_amount: Joi.number().integer().optional(),
        resevation_id: Joi.string().min(3).max(15).optional()
    });

const userSchemaSignUp = Joi.object()
    .keys({
        user_name: Joi.string().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required(),
        roles: Joi.array().items(Joi.string().valid("user", "admin", "moderator")).min(1).required() //This collumn for roles modedl not user model
    });

const userSchemaSignIn = Joi.object()
    .keys({
        user_name: Joi.string().min(3).max(15).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).required()
    });

module.exports = {
    passangerSchema,
    airportSchema,
    bookingDetailsSchema,
    flightDetailsSchema,
    paymentStatusSchema,
    userSchemaSignUp,
    userSchemaSignIn
};
