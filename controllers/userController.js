import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import * as errorHanlderUtils from "../utils/errorHandler.js";

/**
 * Controller for registering a new user
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const registerUser = async (req, res) => {
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
