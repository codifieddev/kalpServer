import { Router } from "express";
import {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm
} from "../controllers/form.controller";

const router = Router({ mergeParams: true });

router.post("/", createForm);
router.get("/", getForms);
router.get("/:id", getFormById);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
