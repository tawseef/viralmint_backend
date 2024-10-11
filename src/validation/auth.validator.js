const Joi = require("joi");

// Joi Schema for Login
const loginBodyValidaton = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

// Joi Schema for Signup
const signUpBodyValidation = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
    location: Joi.string().default("")
});

module.exports = { loginBodyValidaton, signUpBodyValidation };
