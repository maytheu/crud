import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import taskRouter from "./task.router";
import { authenticate } from "../controller/authenticate";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.redirect("https://documenter.getpostman.com/view/8279131/2sA3dxDreT")
);
router.use("/auth", authRouter);
router.use("/task", authenticate, taskRouter);

export default router;
