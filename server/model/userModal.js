import mongoose, { Schema } from "mongoose";
import { Class, classSchema } from "./classModal.js";

const userSchema = new Schema({
  name: {
    type: String,
  },
  bookedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
});

const User = mongoose.model("User", userSchema);

export { userSchema, User };
