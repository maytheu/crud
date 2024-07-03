import mongoose from "mongoose";
import AppError from "../config/AppError";
import { notFound } from "../controller/globalError";
import Task from "../model/task.model";
import { ITask } from "../model/task.types";

class TaskService {
  newTask = async (user: string, name: string) => {
    const newTaskData = new Task({ user, name });
    await newTaskData.save();
    return { name: newTaskData.name, status: newTaskData.status };
  };

  tasks = async (user: string) => {
    return await Task.find(
      { user: user, deleted: false },
      "-user -deleted -__v"
    );
  };

  task = async (taskId: string) => {
    if (!mongoose.isValidObjectId(taskId)) return notFound("Task");
    const singleTask = await Task.findById(taskId).populate({
      path: "user",
      select: "name email",
    });
    if (!singleTask) return notFound("Task");
    // if (singleTask.deleted) return new AppError("Task deleted", 404);
    return {
      name: singleTask.name,
      status: singleTask.status,
      user: singleTask.user,
      id: singleTask.id,
      created: singleTask.createdAt,
      updated: singleTask.updatedAt,
    };
  };

  updateTask = async (taskId: string, task: ITask) => {
    if (!mongoose.isValidObjectId(taskId)) return notFound("Task");
    const data = await Task.findByIdAndUpdate(taskId, task, { new: true });
    if (!data) return notFound("Task");
    return { name: data.name, status: data.status, updated: data.updatedAt };
  };

  deleteTask = async (taskId: string) => {
    if (!mongoose.isValidObjectId(taskId)) return notFound("Task");
    return await Task.findByIdAndUpdate(taskId, { deleted: true });
  };
}

export default new TaskService();
