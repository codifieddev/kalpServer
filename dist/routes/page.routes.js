"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controller_1 = require("../controllers/page.controller");
const router = (0, express_1.Router)({ mergeParams: true });
router.post("/", page_controller_1.createPage);
router.get("/", page_controller_1.getPages);
router.get("/:slug", page_controller_1.getPageBySlug);
exports.default = router;
