import jwt from "jsonwebtoken";
import { APIError } from "./apiError.js";
import { admin, dealership, user } from "../constants/constants.js";


export const getJsonWebToken = async ({type = "", agent}) => {
    try {
        
       if(type === "") {
               throw new APIError(400, "Invalid Token"); 
           }
       if(type === user){
           return jwt.sign({
               _id: agent._id,
               email: agent.user_email,
               type: user
           },
           process.env.TOKEN_SECRET,
           {
            expiresIn: process.env.TOKEN_EXPIRY
           }
        )
       }

       if(type === dealership){
        return jwt.sign({
            _id: agent._id,
            email: agent.dealership_email,
            type: dealership
        },
        process.env.TOKEN_SECRET,
        {
         expiresIn: process.env.TOKEN_EXPIRY
        }
     )
    }

    if(type === admin){
        return jwt.sign({
            _id: agent._id,
            email: agent.admin_email,
            type: admin
        },
        process.env.TOKEN_SECRET,
        {
         expiresIn: process.env.TOKEN_EXPIRY
        }
     )
    }
       
   } catch ( error ) {
       throw new APIError(400, error?.message, "JWT error");
   }
}
