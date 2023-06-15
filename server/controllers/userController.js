const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create new user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send({
        success: false,
        message:
          "All fields are required. Please fill in all fields to proceed.",
      });
    }

    // Exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message:
          "User already exists. Please choose a different User Name or Email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "Congratulations! Your account has been created successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:
        "There was an error in the register callback. Please try again later or contact support for assistance.",
      success: false,
      error,
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "Here is the list of all users data.",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:
        "There was an error in fetching all users data. Please try again later or contact support for assistance.",
      error,
    });
  }
};

// Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide an email and password.",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).send({
        success: false,
        message:
          "The email you entered is not registered. Please enter a valid email address or register for a new account.",
      });
    }
    // Compare bcrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password. Please try again.",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "Congratulations! You have successfully logged in.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message:
        "There was an error in the login callback. Please try again later or contact support for assistance.",
      error,
    });
  }
};
