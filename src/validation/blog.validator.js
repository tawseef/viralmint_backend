const Joi = require("joi");

const blogValidation = Joi.object().keys({
  title: Joi.string().required().max(150),
  email: Joi.string().required(),
  content: Joi.string().default(""),
  location: Joi.string().default("")
});


const contentValidation = Joi.object().keys({
  email: Joi.string().required(),
  content: Joi.string().required()
});

module.exports =  { blogValidation, contentValidation } 
