import { Router } from "express";
import { aboutMe, addCar, allDeals, createNewDeal, getDealsForCar, loginDealership, registerDealership, removeDeal, viewAllCars } from "../controllers/dealership.controller.js";
import { verifyDealershipJWT } from "../middleware/auth.middleware.js";
import { getCarFromDealId, getCarFromSoldVehiclesId } from "../utils/getCarsfromId.js";
import { getAllDealerships } from "../utils/getAllDealships.js";

const dealershipRouter = Router();

dealershipRouter.route("/register").post(registerDealership);
dealershipRouter.route("/login").post(loginDealership);
dealershipRouter.route('/add-cars').post(verifyDealershipJWT, addCar); 
dealershipRouter.route("/aboutme").post(verifyDealershipJWT, aboutMe);
dealershipRouter.route("/all-deals").post(verifyDealershipJWT, allDeals);
dealershipRouter.route("/create-deal").post(verifyDealershipJWT, createNewDeal);  
dealershipRouter.route("/view-all-cars").post(verifyDealershipJWT, viewAllCars); 
dealershipRouter.route('/sold-car-info').post(getCarFromSoldVehiclesId); 
dealershipRouter.route('/get-all-dealerships').post(getAllDealerships);
dealershipRouter.route('/get-deals-car').post(verifyDealershipJWT, getDealsForCar); 
dealershipRouter.route('/remove-deal').post(verifyDealershipJWT, removeDeal);  
dealershipRouter.route('/deal-info').post(verifyDealershipJWT, getCarFromDealId);
export default dealershipRouter;


