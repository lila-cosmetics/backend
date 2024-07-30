import mongoose, { model, Schema } from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [  //array of objects
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price:{ type: Number, required:true},
      product:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
      }
    },
  ],
});



