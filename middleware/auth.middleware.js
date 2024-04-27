import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { APIError } from '../utils/apiError.js';
import { getAdminCollection, getDealershipCollection, getUsersCollection } from '../utils/databaseCollections.js';
import { ObjectId } from 'mongodb';

const verifyUserJWT = asyncHandler(async (req, res, next ) => {

    try {
        
        const token = await req.cookies?.token || "";
        console.log(token); 
        if(!token) {
            throw new APIError(401, "Unauthorized request"); 
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userCollection = await getUsersCollection();

        console.log(decodedToken); 
        const user = await userCollection.findOne({_id: new ObjectId(decodedToken._id)})

        if(!user) {
            throw new APIError(401, "No access rights "); 
        };
        
        req.user = user; 
        next(); 
    } catch( error ) {
        throw new APIError(401, error?.message || "Invalid token");
    }

});

const verifyDealershipJWT = asyncHandler(async (req, res, next ) => {

    try {
        
        const token = await req.cookies?.token || "";

        if(!token) {
            throw new APIError(401, "Unauthorized request"); 
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const dealershipCollection = await getDealershipCollection(); 

        console.log(decodedToken); 
        const user = await dealershipCollection.findOne({_id: new ObjectId(decodedToken._id)})

        if(!user) {
            throw new APIError(401, "No access rights "); 
        };

        req.user = user;
        next(); 
    } catch( error ) {
        throw new APIError(401, error?.message || "Invalid token");
    }

});

const verifyAdminJWT = asyncHandler(async (req, res, next ) => {
    try {
        
        const token = await req.cookies?.token || "";

        if(!token) {
            throw new APIError(401, "Unauthorized request"); 
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const adminCollection = await getAdminCollection();

        console.log(decodedToken); 
        const user = await adminCollection.findOne({_id: new ObjectId(decodedToken._id)})

        if(!user) {
            throw new APIError(401, "No access rights "); 
        };

        req.user = user;
        next(); 
    } catch( error ) {
        throw new APIError(401, error?.message || "Invalid token");
    }

})

export {
    verifyUserJWT,
    verifyDealershipJWT,
    verifyAdminJWT
};
