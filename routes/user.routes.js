import { Router } from "express";
import { aboutMe, buyCar, getDealsForCar, loginUser, registerUser, viewAllCars } from "../controllers/user.controller.js"; 
import { verifyUserJWT } from "../middleware/auth.middleware.js";
import { getCarFromSoldVehiclesId } from "../utils/getCarsfromId.js";
import { getAllDealerships } from "../utils/getAllDealships.js";


const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser); 
userRouter.route("/aboutme").post(verifyUserJWT, aboutMe); 
userRouter.route('/view-all-cars').post(verifyUserJWT, viewAllCars);
userRouter.route('/get-deals-car').post(verifyUserJWT, getDealsForCar); 
userRouter.route('/buy-car').post(verifyUserJWT, buyCar); 
userRouter.route('/sold-car-info').post(getCarFromSoldVehiclesId);
userRouter.route('/get-all-dealerships').post(getAllDealerships); 

export default userRouter;


