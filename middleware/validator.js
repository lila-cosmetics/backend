import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

export const validator = (req, res, next) => {
  //Extract any validation errors from the request object

  const errors = validationResult(req);

  //If there are validation errors, return them to the client
  if (!errors.isEmpty()) {
    //Format validation errors into a more readable format
    const formattedErrors = errors.array().map((error) => ({
      type: "field",
      value: req.body[error.param], // This line is updated
      msg: error.msg,
      path: error.param,
      location: "body",
    }));

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: formattedErrors });
  }

  next();
};
