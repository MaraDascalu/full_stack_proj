import bcrypt from "bcrypt";
import User from "../model/User.js";
import { generateToken } from "../utils/token.js";

const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    // * check if fields are empty
    if (!fullname || !email || !password) {
      return next(new Error("All fields are required!"));
    }

    // * check if email is already used
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new Error("Email is already taken!"));
    }

    // * hash password
    const hashSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, hashSalt);

    // * create user
    const createUser = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    return res.json({
      status: "success",
      data: createUser,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("All fields are required!"));
    }

    // * check if email exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new Error("Invalid credentials!"));
    }

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return next(new Error("Invalid credentials!"));
    }

    res.json({
      status: "success",
      data: userFound,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

const userProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    const userFound = await User.findById(userId).populate({
      path: "accounts",
      populate: { path: "transactions" },
    });

    if (!userFound) {
      return next(new Error("Invalid user id!"));
    }

    res.json({
      status: "success",
      data: userFound,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleteProfile = await User.findByIdAndDelete(req.user);
    if (!deleteProfile) {
      return next(new Error("User was not found!"));
    }

    res.json({
      status: "success",
      message: "User deleted!",
    });
  } catch (error) {
    next(new Error(error));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateArray = Object.entries(req.body);
    // * remove empty strings from update form
    const filterUpdateArray = updateArray.filter(([key, value]) => {
      return value !== "";
    });
    let updateObj = Object.fromEntries(filterUpdateArray);

    // * check if email is already used
    if (updateObj.email) {
      const emailTaken = await User.findOne({ email: updateObj.email });
      if (emailTaken) {
        return next(new Error("This email is already taken!"));
      }
    }

    // * hash the password (if provided)
    if (updateObj.password) {
      const hashSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(updateObj.password, hashSalt);
      updateObj = { ...updateObj, password: hashPassword };
    }

    // * update the user
    const updatedUser = await User.findByIdAndUpdate(req.user, updateObj, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export { deleteUser, loginUser, registerUser, updateUser, userProfile };
