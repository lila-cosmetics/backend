import { StatusCodes } from "http-status-codes";
import { verifyJwt } from "./jwt.js";

export const authorizeUser = async (req, res, next) => {
  //Handle if the token is not present
  if (!req.cookies.userToken) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "No secity token provided" });
  }

  //Verify the token is present
  try {
    const isValid = verifyJwt(req.cookies.userToken);

    if (isValid) {
      //If the token is valid, move to the next middleware
      next();
    } else {
      //If the token is not valid, return an aunauthorized message
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid security token" });
    }
  } catch (error) {
    //Handle errors during token verification
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Security token has expired or is invalid. Please log in again.",
    });
  }
};
