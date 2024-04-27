import { getAdminCollection, getCarsCollection } from "../utils/databaseCollections.js";
import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/apiResponse.js";
import { getJsonWebToken } from "../utils/jwtHandler.js";
import bcryptjs from 'bcryptjs'; 
import { ObjectId } from "mongodb";

const registerAdmin = asyncHandler(async (req, res) => {

    console.log(req.body); 

    const newAdminData = req.body; 
    const {admin_email, password} = newAdminData;

    // validation 
    if(
        [admin_email, password].some((value) => {
            return value?.trim() === "" || value === undefined
        })
    ) {
        throw new APIError(400, "* fields are required"); 
    }

    const adminCollection = await getAdminCollection();
    const alreadyUser = await adminCollection.findOne({admin_email: admin_email});
    if(alreadyUser) {
        throw new APIError(400, "Admin user already present"); 
    }

    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt); 
    newAdminData.password = hashPassword; 

    // Creating new admin
    await adminCollection.insertOne(newAdminData);
    const newAdmin = await adminCollection.findOne({admin_email: admin_email});
     
    const createdUser = {
        admin_email: newAdmin.admin_email,
    }
    return res.status(201).json(
        new APIResponse(200, createdUser, "New Admin user created successfully" )
    );

});

const loginAdmin = asyncHandler(async (req, res) => {
    
   
    const {admin_email, password} = await req.body;
    console.log(req.body); 

    if(!admin_email || !password) {
        throw new APIError(400, "Enter admin email and password");  
    }

    const adminCollection = await getAdminCollection();
    const admin = await adminCollection.findOne({admin_email: admin_email});

    // validation 
    if(!admin) {
        throw new APIError(400, "admin does not exist"); 
    }

    const isValidPassword  = await bcryptjs.compare(password, admin.password); 

    if(!isValidPassword) {
        throw new APIError(400, "invalid credentials"); 
    }

    // Set jwt to the user

    //  const user = await userCollection
    //                 .findOne({user_email: email}, {
    //                     projection: {password:0}
    //                 });
    console.log(admin); 

    const token = await getJsonWebToken({type :"admin", agent: admin});
    const result = await adminCollection.updateOne(
        {admin_email: admin_email},
        {$set: {token: token}},
        {projection: {password:0}}
    )

    const loginAdmin = {
        admin_email: admin.admin_email,
    }
    
    const cookieOptions = {
        httpOnly:true,
        secure: true
    }

    console.log("token", token); 

    return res
        .cookie("token", token, cookieOptions)
        .status(200)
        .json(
        new APIResponse(200, loginAdmin, "Login successfull")
     );
    //const user = 
    //const token = getJsonWebToken("user", user  )
});

const addNewCars = asyncHandler(async (req, res) => {

    const carDetails = await req.body; 
    console.log(carDetails); 
    const carsCollection = await getCarsCollection();
    const car = await carsCollection.findOne({_id: new ObjectId(carDetails?._id)});

    if(car) {
        throw new APIError(400, "car already exists"); 
    }
    await carsCollection.insertOne(carDetails);

    res.status(200).json(
        new APIResponse(200, car, "New car added succesfully")
    ); 
});


const aboutMe = asyncHandler(async (req, res) => {
    res.status(200).json(
        new APIResponse(200, "Admin about me page")
    ); 
});

export {
    registerAdmin,
    loginAdmin,
    addNewCars, 
    aboutMe

}