const { validationResult } = require("express-validator");

function validate(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: error.array(),
        });
    }
    next();
}

module.exports = validate;