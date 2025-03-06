import mongoose from "mongoose";
import validator from "validator";

const userSignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: false,
  },
  profileUrl: {
    type: String,
    required: false,
  },
  bannerUrl: {
    type: String,
    required: false,
  },
  joinedDate: {
    type: String,
    required: false,
  },
});

export const UserSignUp = mongoose.model("UserLogin", userSignUpSchema);
