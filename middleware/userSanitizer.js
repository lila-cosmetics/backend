import { body } from "express-validator";
import {
  uppercaseFirstLetter,
  checkUserExistenceByEmail,
} from "../helpers/userHelper.js";

export const validateUserRules = [
  //Sanitize and validate the first and last name

  body(["firstname", "lastname"])
    .isAlpha("en-GB", {
      ignore: "",
    }) //Ignores the spaces,
    .customSanitizer((value) => uppercaseFirstLetter(value))
    .withMessage("First and last name can only contain letters"),

  //Sanitize and validate the email
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail() //Normalize email address
    .customSanitizer((value) => value.toLowerCase()) //Convert email to lowercase
    .custom(async (value) => checkUserExistenceByEmail(value)),

  //Sanitize and validate the password
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, and at least one symbol."
    ),
];
