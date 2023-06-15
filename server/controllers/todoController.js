const mongoose = require("mongoose");
const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");

// Get all todos
exports.getAllTodosController = async (req, res) => {
  try {
    const todos = await todoModel.find({}).populate("user");
    if (!todos) {
      return res.status(200).send({
        success: false,
        message:
          "No todos found. Please check back later or try a different search.",
      });
    }
    return res.status(200).send({
      success: true,
      TodoCount: todos.length,
      message: " Here are all the todo posts that match your search criteria.",
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:
        "There was an error while retrieving todo posts. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Create todo
exports.createTodoController = async (req, res) => {
  try {
    const { title, stack, description, image, user } = req.body;
    // Validation
    if (!title || !stack || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message:
          "Please provide all fields. You must fill out all required fields before submitting the form.",
      });
    }
    const exisitingUser = await userModel.findById(user);
    // Validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message:
          "Unable to find user. Please check the user ID or contact support for assistance.",
      });
    }

    const newTodo = new todoModel({ title, stack, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newTodo.save({ session });
    exisitingUser.todos.push(newTodo);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newTodo.save();
    return res.status(201).send({
      success: true,
      message: "Congratulations on creating your todo!",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while creating the todo post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Update Todo
exports.updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, stack, description, image } = req.body;
    const todo = await todoModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Todo updated!",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while updating the todo post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Single todo
exports.getTodoByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res.status(404).send({
        success: false,
        message:
          "Todo not found with this ID. Please check the todo ID or contact support for assistance.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Todo post retrieved successfully!",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while retrieving the todo post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Delete todo
exports.deleteTodoController = async (req, res) => {
  try {
    const todo = await todoModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await todo.user.todos.pull(todo);
    await todo.user.save();
    return res.status(200).send({
      success: true,
      message: "Todo post deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while deleting the todo post. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Get user todo
exports.userTodoControlller = async (req, res) => {
  try {
    const userTodo = await userModel.findById(req.params.id).populate("todos");

    if (!userTodo) {
      return res.status(404).send({
        success: false,
        message:
          "Todos not found with this ID. Please check the todo ID or contact support for assistance.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Retrieved user todos successfully!",
      userTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message:
        "There was an error while retrieving user todos. Please try again later or contact support for assistance.",
      error,
    });
  }
};
