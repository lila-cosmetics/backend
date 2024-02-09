import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128, // for precise price representation
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["skin", "hair", "beauty"],
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0, // quantity should not be negative
    },
    image: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Sold Out", "Comming soon"],
      default: "Available",
    },
    description: {
      type: String,
    },
    tags: [String], //This setup provides a convenient way to categorize and search for documents based on their associated tags, offering flexibility in organizing and querying the data.
  },
  { timestamps: true }
);

const Product = model('Product', productSchema)
export default Product;