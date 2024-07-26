import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateJwt } from "../auth/jwt.js";
import * as errorHanlderUtils from "../utils/errorHandler.js";

/**
 * Controller for registering a new user
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 12)
console.log(req.body)
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    //Returns a bad request if the user does not provide valid data
    if (!newUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "You need to provide the required information to register!",
      });
    }

    //Returns a success message if the user is created
    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

/**
 *
 *
 * Controller for user Login
 * @param {*} req
 * @param {*} res
 * @returns
 */
/* export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user with the provided lowerCaseEmail
    const user = await User.findOne({ email: email.toLowerCase() });

    // If the user does not exist, return a bad request
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The provided email or password doesn't match with system!",
      });
    }

    //Compare the entered password with the hashed password in the database
    const matchedPassword = await bcrypt.compare(password, user.password);

    //check if the password matches
    if (matchedPassword) {
      //Generates a JWT token for the user
      const token = generateJwt(user._id);

      //Set the token as an HTTP-only cookie
      //Production environment settings
      if (process.env.NODE_ENV === "production") {
        res.cookie("userToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
      } else {
        res.cookie("userToken", token, {
          httpOnly: true,
          secure: false,
        });
      }

      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${user.firstname} ${user.lastname}`,
        user_info: {
          userId: user._id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return errorHanlderUtils.handleInternalServerError(res);
  }
}; */

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Received login request:", { email, password }); // Log received data
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("User found:", user); // Log found user

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The provided email or password doesn't match with system!",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    console.log("Password match:", matchedPassword); // Log password match result

    if (matchedPassword) {
      const token = generateJwt(user._id);
      console.log("JWT token:", token); // Log generated token

      res.cookie("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      });

      return res.status(StatusCodes.OK).json({
        message: `Login successful. Welcome, ${user.firstname} ${user.lastname}`,
        user_info: {
          userId: user._id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        },
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The provided email or password doesn't match with system!",
      });
    }
  } catch (error) {
    console.log("error during Login", error);
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

/**
 * Controller to logout user
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: false,
    });

    return res.status(StatusCodes.OK).json({ message: "User logged out!" });
  } catch (error) {
    console.log(error);
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

//get all users by Admin
export const getAllUserProfile = async (req, res) => {
  try {
    const users = User.find({});
    if (users) {
      return res.status(StatusCodes.OK).json(users);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No Users found" });
    }
  } catch (error) {
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

/* not completed yet! */
export const updateUserProfile = async (req, res) => {};

export const deleteUser = async (req, res) => {};
