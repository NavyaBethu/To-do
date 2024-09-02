// validationSchemas.js
const Joi = require('joi');

const createTodoSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().optional(),
});

const updateTodoSchema = Joi.object({
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().optional(),
  completed: Joi.boolean().optional(),
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

const searchTodoSchema = Joi.object({
  search: Joi.string().min(1).optional(),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  paginationSchema,
  searchTodoSchema,
};
