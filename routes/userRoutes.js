import express from "express";
import { login, logout, register, getAllUserProfile, updateUserProfile, deleteUser } from "../controllers/userController.js";
import { validator } from "../middleware/validator.js";
import { validateUserRules } from "../middleware/userSanitizer.js";
import { authorizeUser } from "../auth/userAuthorization.js";

const router = express.Router();

// Unprotected routes
router.post("/register", validateUserRules, validator, register);
router.post("/login", login);
router.post("/logout", logout); //change get to post request it's more secure
router.get('/userProfile', getAllUserProfile);
router.put('/updateUserProfile', updateUserProfile);
router.delete('/deleteUser', deleteUser)

export default router;
