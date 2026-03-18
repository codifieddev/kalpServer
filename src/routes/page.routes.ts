import { Router } from "express";
import {
  createPage,
  getPageBySlug,
  getPages
} from "../controllers/page.controller";

const router = Router({ mergeParams: true });

router.post("/", createPage);
router.get("/", getPages);
router.get("/:slug", getPageBySlug);

export default router;
