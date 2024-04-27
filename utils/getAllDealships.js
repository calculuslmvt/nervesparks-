import { APIError } from "./apiError.js";
import { APIResponse } from "./apiResponse.js";
import { asyncHandler } from "./asyncHandler.js";
import { getDealershipCollection } from "./databaseCollections.js";

export const getAllDealerships = asyncHandler(async(req, res)=>{

    try {
        const dealershipCollection = await getDealershipCollection();
        const allDealerships = await dealershipCollection.find({}).toArray();

        return res.status(200).json(
            new APIResponse(200, allDealerships, "Dealership fetched successfully")
        );

    } catch (error) {
        throw new APIError(400, error.message); 
    }
})