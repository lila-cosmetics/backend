import { StatusCodes } from "http-status-codes";

/**
 * Error handler for internal server errors 500
 * @param {*} res
 * @returns
 */
export const handleInternalServerError = (res) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message:
      "An error occurred while processing your request. Please try again later.",
  });
};
