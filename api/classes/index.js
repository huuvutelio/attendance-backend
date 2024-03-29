import { Router } from "express";
import { asyncRouteHandler } from "../../middlewares/asyncRouter.js";
import controller from "./controller.js";
import authMiddleware from "../../middlewares/auth.js";
import { ADMIN_ROLE, TEACHER_ROLE } from "../../utils/constant.js";

const router = Router();

router.get(
  "/",
  authMiddleware(ADMIN_ROLE, TEACHER_ROLE),
  asyncRouteHandler(controller.getAllClasses)
);

router.get(
  "/:id",
  authMiddleware(ADMIN_ROLE, TEACHER_ROLE),
  asyncRouteHandler(controller.getClassById)
);

router.post(
  "/",
  authMiddleware(ADMIN_ROLE, TEACHER_ROLE),
  asyncRouteHandler(controller.addClass)
);

router.put(
  "/:id",
  authMiddleware(ADMIN_ROLE, TEACHER_ROLE),
  asyncRouteHandler(controller.updateClass)
);

export default router;
