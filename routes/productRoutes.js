import express from 'express'
import { getAllProducts,addNewProduct,deleteProductById,updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/getAllProducts',getAllProducts)
router.post('/addNewProduct',addNewProduct)
router.delete('/deletById/:id',deleteProductById)
router.patch('/updateProduct/:id',updateProduct)

export default router;
