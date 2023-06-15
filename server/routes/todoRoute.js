const express = require("express");
const {
  getAllTodosController,
  createTodoController,
  updateTodoController,
  getTodoByIdController,
  deleteTodoController,
  userTodoControlller,
} = require("../controllers/todoController");

// Router Object
const router = express.Router();

// Routes

// GET || All todo
router.get("/all-todo", getAllTodosController);

// POST || Create todo
router.post("/create-todo", createTodoController);

// PUT || Update todo
router.patch("/update-todo/:id", updateTodoController);

// GET || Single todo detail
router.get("/get-todo/:id", getTodoByIdController);

// DELETE || Delete todo
router.delete("/delete-todo/:id", deleteTodoController);

// GET || User todo
router.get("/user-todo/:id", userTodoControlller);

module.exports = router;
