import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import * as errorHanlderUtils from "../utils/errorHandler.js";

/**
 * Controller for getting all the products
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products) {
      return res.status(StatusCodes.OK).json(products);
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "No products found" });
    }
  } catch (error) {
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

/**
 * controller for getting product by id
 */

export const getProductById = async (req, res) => {
  try {
    const productId = req.params._id; // get product id from URL
    const productItem = await Product.findById(productId);
    if (productItem) {
      res.status(StatusCodes.OK).json(productItem);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "the product not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Controller for adding new products
 * @param {*} req
 * @param {*} res
 */
export const addNewProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      type,
      availableQuantity,
      image,
      status,
      description,
      tags,
    } = req.body;
    const newProduct = new Product({
      name,
      price,
      type,
      availableQuantity,
      image,
      status,
      description,
      tags,
    });
    const savedProduct = await newProduct.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "the product was added successfully", savedProduct });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

/**
 * Controller for deleting products by ID
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params._id;
    if (!productId) {
      console.log("the product not found");
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "the product not found check the product id! " });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "the Product not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "The product was deleted successfully!" });
  } catch (error) {
    return errorHanlderUtils.handleInternalServerError(res);
  }
};

/**
 * Controller for updating products
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params._id;
    if (!productId) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "the product not found check the product id!" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "The product was updated successfully" });
  } catch (error) {
    return errorHanlderUtils.handleInternalServerError(res);
  }
};
