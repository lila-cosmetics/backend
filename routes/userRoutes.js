import express from "express";
import { login, register } from "../controllers/userController.js";
import { validator } from "../middleware/validator.js";
import { validateUserRules } from "../middleware/userSanitizer.js";
import { authorizeUser } from "../auth/userAuthorization.js";

const router = express.Router();

// Unprotected routes
router.post("/register", validateUserRules, validator, register);
router.post("/login", login);

export default router;
