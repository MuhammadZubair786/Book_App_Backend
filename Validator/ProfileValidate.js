const Joi = require('joi');
const { model } = require('mongoose');
const customDateValidator = (value, helpers) => {
    const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Custom regex for DD/MM/YYYY format
  
    if (!value.match(regex)) {
      return helpers.error('date.format');
    }
  
    return value;
  };
const ProfileValidator = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    dateOfBirth:  Joi.custom(customDateValidator, 'custom date format').required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),

})



module.exports = { ProfileValidator }