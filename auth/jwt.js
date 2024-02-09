import jwt from "jsonwebtoken";

/**
 * Handler for generating a JWT token
 * @param {*} userId
 * @returns
 */
export const generateJwt = (userId) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
};

/**
 * Hanlder for verifying a JWT token
 * @param {*} token
 * @returns
 */
export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
