import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: [true, "Account name is required"] },
  email: {
    type: String,
    unique: true,
    required: [true, "Account email is required"],
  },
  password: { type: String, required: true },
});

const User = model("user", userSchema);

export default User;
