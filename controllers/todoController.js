const Todo = require('../models/todoModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId; 
    const todo = await Todo.create({
      title,
      description,
      userId,
    });
    return res.status(201).json({data:todo});
};

const getTodos = async (req, res) => {
    const userId = req.userId; 
  
      const todos = await Todo.findAll({
        where: { userId },
      });
     return res.status(200).json(todos);
   
  };

const updateTodo = async (req, res) => {
    const { id } = req.params;  
    const { title, description, completed } = req.body;
    const userId = req.userId; 
      const todo = await Todo.findOne({ where: { id, userId } });
      if (!todo) {
        return res.status(404).json({ message: "To-do not found or not authorized" });
      }
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      todo.completed = completed !== undefined ? completed : todo.completed;
      await todo.save();
      return res.status(200).json({ data: todo });
  };
const deleteTodo = async (req, res) => {
    const { id } = req.params;  
    const userId = req.userId; 
      const todo = await Todo.findOne({ where: { id, userId } });
      if (!todo) {
        return res.status(404).json({ message: "To-do not found or not authorized" });
      }
      await todo.destroy();
      return res.status(200).json({ message: "To-do deleted successfully" });
  };

  const getPaginatedTodos = async (req, res) => {
    let { page, limit } = req.query;
    const userId = req.userId;
        let todos;
        if (page && limit) {
            page = parseInt(page);
            limit = parseInt(limit);
            todos = await Todo.findAll({
                where: { userId },
                offset: (page - 1) * limit,
                limit: limit,
            });
        } else {
            todos = await Todo.findAll({ where: { userId } });
        }
        return res.status(200).json({ data: todos });
};


  
const searchTodo = async (req, res) => {
    const userId = req.userId;
    const { search } = req.query;
      const searchOptions = {
        where: {
          userId,
        },
      };
  
      if (search) {
        searchOptions.where[Op.or] = [
          {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${search}%`,
            },
          },
    
        ];
      }
  
      const todos = await Todo.findAll(searchOptions);
      return res.status(200).json(todos);
   
  };
  
  module.exports = { getTodos };
  
  
module.exports={createTodo,getTodos,updateTodo,deleteTodo,getPaginatedTodos,searchTodo}