import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({ message: "ok" });
});

//User routes
router.post("/users", new CreateUserController().handle);
