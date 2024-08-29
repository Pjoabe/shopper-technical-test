import express from "express";
import { listController } from "../controllers/listController";

const router = express.Router();

router.get("/:customer_code/list", listController.list);

export default router;
