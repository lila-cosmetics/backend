import express from "express";
import {
  getAllProducts,
  addNewProduct,
  deleteProductById,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeUser } from "../auth/userAuthorization.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);

/* router.use(authorizeUser);
 */
router.post("/addNewProduct", addNewProduct);

router.delete("/deleteById/:_id", deleteProductById);
router.patch("/updateProduct/:_id", updateProduct);

export default router;
