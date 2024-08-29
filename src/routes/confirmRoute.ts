import express from "express";
import { confirmController } from "../controllers/confirmController";

const router = express.Router();

router.patch("/confirm", confirmController.confirm);

export default router;
