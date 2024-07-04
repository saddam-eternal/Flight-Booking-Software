const commonFunctionValidation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        
        if (error) {
            const validationErrors = error.details.map(detail => detail.message);
            console.log("Validation errors:", validationErrors);
            return res.status(400).json({ "VALIDATION ERRORRS": validationErrors });
        }
        next();
    };
};

module.exports = commonFunctionValidation;
