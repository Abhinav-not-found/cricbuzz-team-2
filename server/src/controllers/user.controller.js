const UserModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// for register the user
const registerUserController = async (req, res) => {
  try {
    let { name, email, password, role, isDeleted } = req.body;

    if (!name || !email || !password || !role)
      return res.status(400).json({
        message: "All field are required",
      });

    const isExisted = await UserModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already existed",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_ACCESS, {
      expiresIn: "1h",
    });

    res.cookie("new_Token", token);

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// for getting the user testing purpose

const getUserController = async (req, res) => {
  try {
    const user = await UserModel.find();
    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// for login the user

const loginUserController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({
        message: "All fields are required",
      });

    const isExisted = await UserModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    const comparePass = await bcrypt.compare(password, isExisted.password);

    if (!comparePass)
      return res.status(401).json({
        message: "Invalid credential",
      });

    const token = jwt.sign(
      { id: isExisted.password },
      process.env.JWT_SECRET_ACCESS,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("login_toke", token);

    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  registerUserController,
  getUserController,
  loginUserController,
};
