import { Router } from "express";
import TaskController from "../controller/Task.controller";

const taskRouter = Router();

taskRouter.post("/new", TaskController.newTask);
taskRouter.get("/", TaskController.tasks);
taskRouter
  .route("/:id")
  .get(TaskController.task)
  .put(TaskController.updateTask)
  .delete(TaskController.deleteTask);

export default taskRouter;
