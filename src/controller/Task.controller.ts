import { NextFunction, RequestHandler, Response } from "express";
import AppController from "./App.controller";
import TaskService from "../service/Task.service";
import { NewTaskDTO, UpdateTaskDTO } from "../model/task.types";
import AppError from "../config/AppError";

class TaskController extends AppController {
  newTask: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user;
      await NewTaskDTO.parse(req.body);

      const data = await TaskService.newTask(userId, req.body.name);
      if (data instanceof AppError) return next(data);

      this.sendCreatedResp(res, "New task created", data);
    } catch (error) {
      next(error);
    }
  };

  tasks: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user;

      const data = await TaskService.tasks(userId);
      if (data instanceof AppError) return next(data);

      this.sendResp(res, "All tasks", data);
    } catch (error) {
      next(error);
    }
  };

  task: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const data = await TaskService.task(id);
      if (data instanceof AppError) return next(data);

      this.sendResp(res, "View Task", data);
    } catch (error) {
      next(error);
    }
  };

  updateTask: RequestHandler = async (req, res, next) => {
    try {
      await UpdateTaskDTO.parse(req.body);
      const { id } = req.params;

      const data = await TaskService.updateTask(id, req.body);
      if (data instanceof AppError) return next(data);

      this.sendResp(res, "Task updated", data);
    } catch (error) {
      next(error);
    }
  };

  deleteTask: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await TaskService.deleteTask(id);
      this.sendDelResp(res, "Task deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default new TaskController();
