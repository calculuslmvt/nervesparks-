import { ObjectId } from "mongodb";
import { APIError } from "./apiError.js";
import { APIResponse } from "./apiResponse.js";
import { asyncHandler } from "./asyncHandler.js";
import { getCarsCollection, getDealCollection, getSoldVehiclesCollection } from "./databaseCollections.js";

const getCarFromSoldVehiclesId = asyncHandler(async (req, res) => {
    
    try {
        const {soldVehicleId} = await req.body;
        const soldVehiclesCollection = await getSoldVehiclesCollection();
        const soldVehicleInfo = await soldVehiclesCollection.findOne({_id: new ObjectId(soldVehicleId)});
        console.log(soldVehicleInfo);
        const carId = soldVehicleInfo?.car_id;
        const carsCollection = await getCarsCollection();
        const car = await carsCollection.findOne({_id: new ObjectId(carId)});
        console.log(car); 
        return res.status(200).json(
            new APIResponse(200, car, "car fetched Successfully") 
        );
    } catch (error) {
        throw new APIError(400, error.message); 
    }
    
});

const getCarFromDealId = asyncHandler(async(req, res) => {
    try {
        const {dealId} = await req.body;
        const dealCollection = await getDealCollection();
        const dealInfo = await dealCollection.findOne({_id: new ObjectId(dealId)});
        console.log(dealInfo);
        const carId = dealInfo?.car_id;
        const carsCollection = await getCarsCollection();
        const car = await carsCollection.findOne({_id: new ObjectId(carId)});
        console.log(car); 
        return res.status(200).json(
            new APIResponse(200, car, "car fetched Successfully") 
        );
    } catch (error) {
        throw new APIError(400, error.message); 
    }
});

export {getCarFromSoldVehiclesId, getCarFromDealId};

