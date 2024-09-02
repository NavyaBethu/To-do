// validationSchemas.js
const Joi = require('joi');

const createOrganizationSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
});

module.exports = {
    createOrganizationSchema,
};
