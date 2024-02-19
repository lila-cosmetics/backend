import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
