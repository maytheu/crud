import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.redirect("https://documenter.getpostman.com/view/8279131/2sA3JGe3aS")
);

export default router;
