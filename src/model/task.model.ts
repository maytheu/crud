import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    name: { type: String, required: [true, "Task name is required"] },
    status: {
      type: String,
      enum: ["Created", "Pending", "In Progress", "Completed"],
      default: "Created",
    },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Task = model("task", taskSchema);

export default Task;
