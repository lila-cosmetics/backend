import User from "../models/User.js";

/**
 * Helper to uppercase the first letter of a word
 * @param {*} word
 * @returns
 */
export const uppercaseFirstLetter = (word) => {
  if (typeof word !== 'string') {
    // Handle non-string data gracefully (e.g., return empty string)
    return '';
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};
/**
 * Helper to check if a user exists by email
 * @param {*} email
 */
export const checkUserExistenceByEmail = async (email) => {
  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new Error("A user already exists with this email address");
  }
};
