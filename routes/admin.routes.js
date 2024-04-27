import { Router } from "express";
import { aboutMe, addNewCars, loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middleware/auth.middleware.js";

const adminRouter = Router();

adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/add-cars").post(addNewCars); 
adminRouter.route("/aboutme").post(verifyAdminJWT, aboutMe);

export default adminRouter;
