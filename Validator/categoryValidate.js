
const Joi = require('joi');

const cateogoryValidator = Joi.object({

   
    title: Joi.string().trim().required().messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title cannot be empty',
        // 'string.min': 'Title should have a minimum length of {#limit}',
        // 'string.max': 'Title should have a maximum length of {#limit}',
        'any.required': 'Title is required',
    }),
    description: Joi.string().trim().required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description cannot be empty',
        'any.required': 'Description is required',
    }),
    category_image: Joi.string().trim().required().messages({
        'string.base': 'category_image must be a string',
        'string.empty': 'category_image cannot be empty',
        'any.required': 'category_image is required',
    }),
});


const validateCategory = (Data) => {
    // const { error } = TicketValidator.validate(ticketData,{ abortEarly: false });
    const { error } = cateogoryValidator.validate(Data);

  
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return {
        message: errorMessage,
      };
    }
  
    return null; // Validation successful
  };

module.exports = { validateCategory }