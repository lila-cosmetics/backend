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
  const { firstname, lastname, email, password } = req.body;

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
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
 * Controller for user Login
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
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
        message: `Login successful. Welcome, ${user.firstName} ${user.lastName}`,
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
