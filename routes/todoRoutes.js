const express = require("express");
const router=express.Router()
const todo=require("../controllers/todoController");
const authenticate = require("../middleware/authenticate");
const {validate}=require("../middleware/validate");
const { createTodoSchema, updateTodoSchema, paginationSchema, searchTodoSchema } = require("../validationSchemas/todoValidation");

router.get("/get-todos",authenticate,todo.getTodos);
router.post("/add-task",authenticate,validate(createTodoSchema),todo.createTodo);
router.put("/update-todo/:id",authenticate,validate(updateTodoSchema),todo.updateTodo);
router.delete("/delete-todo/:id",authenticate,todo.deleteTodo);
router.get("/getlist",authenticate,validate(paginationSchema),todo.getPaginatedTodos);
router.get("/search",authenticate,validate(searchTodoSchema),todo.searchTodo);
module.exports=router