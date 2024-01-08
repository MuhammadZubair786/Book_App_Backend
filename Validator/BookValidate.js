
const Joi = require('joi');
const { Types } = require('mongoose');



const objectId = Joi.extend((joi) => ({
    type: 'objectId',
    base: joi.string(),
    messages: {
      'objectId.base': '{{#label}} must be a valid ObjectId',
    },
    validate(value, helpers) {
      if (!Types.ObjectId.isValid(value)) {
        return { value, errors: helpers.error('objectId.base') };
      }
    },
  }));

  


const BookValidator = Joi.object({

    book_name: Joi.string().trim().required().messages({
        'string.base': 'book_name must be a string',
        'string.empty': 'book_name cannot be empty',
        // 'string.min': 'Title should have a minimum length of {#limit}',
        // 'string.max': 'Title should have a maximum length of {#limit}',
        'any.required': 'book_name is required',
    }),

    book_image: Joi.string().trim().required().messages({
        'string.base': 'book_image must be a string',
        'string.empty': 'book_image cannot be empty',
        'any.required': 'book_image is required',
    }),

    book_link: Joi.string().trim().required().messages({
        'string.base': 'book_link must be a string',
        'string.empty': 'book_link cannot be empty',
        'any.required': 'book_link is required',
    }),

    category_id: objectId.objectId().required().messages({
        'any.required': 'category_id is required',
      }),
});


const validateBook = (Data) => {
    // const { error } = TicketValidator.validate(ticketData,{ abortEarly: false });
    const { error } = BookValidator.validate(Data);


    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return {
            message: errorMessage,
        };
    }

    return null; // Validation successful
};

module.exports = { validateBook }