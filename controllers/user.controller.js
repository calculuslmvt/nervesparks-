import { APIResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { getJsonWebToken } from "../utils/jwtHandler.js";
import { getCarsCollection, getDealCollection, getDealershipCollection, getSoldVehiclesCollection, getUsersCollection } from "../utils/databaseCollections.js";
import bcryptjs from 'bcryptjs'; 
import { ObjectId } from "mongodb";

const registerUser = asyncHandler(async (req, res) => {
    // const {email, password} = req.body;

    // if([email, password].some((value) => {
    //         return value?.trim() === ""; 
    //     })) {
    //         throw new APIError(400, "All fields are required");
    //     }

    console.log(req.body); 

    const newUserData = req.body; 
    const {user_email, password, user_location} = newUserData;

    // validation 
    if(
        [user_email, password, user_location].some((value) => value?.trim() === ""  || value === undefined)
    ) {
        throw new APIError(400, "* fields are required"); 
    }

    const userCollection = await getUsersCollection();
    const alreadyUser = await userCollection.findOne({user_email: user_email});
    if(alreadyUser) {
        throw new APIError(400, "user already present"); 
    }

    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt); 
    newUserData.password = hashPassword

    // Creating new user
    await userCollection.insertOne(newUserData);
    const newUser = await userCollection.findOne({user_email: user_email});
     
    const createdUser = {
        user_email: newUser.user_email,
        user_id: newUser.user_id
    }
    return res.status(201).json(
        new APIResponse(200, createdUser, "New user created successfully" )
    );

});

const loginUser = asyncHandler(async (req, res) => {
    
   
    const {user_email, password} = await req.body;
    console.log(req.body); 

    if(!user_email || !password) {
        throw new APIError(400, "Enter username and password");  
    }

    const userCollection = await getUsersCollection();
    const user = await userCollection.findOne({user_email: user_email});

    // validation 
    if(!user) {
        throw new APIError(400, "user does not exist"); 
    }

    const isValidPassword  = await bcryptjs.compare(password, user.password); 

    if(!isValidPassword) {
        throw new APIError(400, "invalid credentials"); 
    }

    // Set jwt to the user

    //  const user = await userCollection
    //                 .findOne({user_email: email}, {
    //                     projection: {password:0}
    //                 });
    console.log(user); 

    const token = await getJsonWebToken({type :"user", agent: user});
    const result = await userCollection.updateOne(
        {user_email: user_email},
        {$set: {token: token}},
        {projection: {password:0}}
    )

    const loginUser = {
        user_email: user.user_email,
        user_id: user.user_id
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
        new APIResponse(200, loginUser, "Login successfull")
     );
    //const user = 
    //const token = getJsonWebToken("user", user  )
});


const viewAllCars = asyncHandler(async(req, res) => {
    const carsCollection = await getCarsCollection();
    const cars = await carsCollection.find({}).toArray();

    res.status(200).json(
        new APIResponse(200, cars, "Cars fetched Successfully")
    ); 
});

const getDealsForCar = asyncHandler(async(req, res) => {
    const {car_id} = await req.body;

    const dealCollection = await getDealCollection();
    const deals = await dealCollection.find({car_id: car_id}).toArray();
    
    console.log(deals);

    res.status(200).json(
        new APIResponse(200, deals, "deals fetched successfully")
    ); 

})

const buyCar = asyncHandler(async(req, res) => {
    // check if car sold 
    const {car_id, deal_id} = await req.body;
    const dealCollection = await getDealCollection();

    const dealDetails = await dealCollection.findOne({_id: new ObjectId(deal_id)});
    const isDealValid = dealDetails.deal_info.isDealValid; 
    console.log(dealDetails.deal_info);
    if(!isDealValid) {
        throw new APIError(400, "Invalid deal"); 
    }

    const new_sold_vehicle = {
        car_id: car_id,
        vehicle_info: {
            deal_id: deal_id, 
        }
    };

    const soldVehiclesCollection = await getSoldVehiclesCollection();
    const {insertedId} = await soldVehiclesCollection.insertOne(new_sold_vehicle); 

    
    const dealInfo = dealDetails.deal_info;
    const newDealInfo = {
        ...dealInfo,
        isDealValid: false
    };
    await dealCollection.updateOne(
        {_id: new ObjectId(deal_id)},
        {$set: {deal_info: newDealInfo}}
    )

    const dealership_id = dealDetails?.deal_info?.dealership_id;

    const dealershipCollection = await getDealershipCollection();

    if(!dealership_id) {
        throw new APIError(400, "Invalid deal details"); 
    } ;

    await dealershipCollection.updateOne(
                    {_id: dealership_id.valueOf()},
                    {$push: {sold_vehicles: insertedId }}
                );

    const userCollection = await getUsersCollection();
    await userCollection.updateOne(
                    {_id: req.user?._id},
                    {$push: {vehicle_info: insertedId}}
                );

    res.status(200).json(
        new APIResponse(200, new_sold_vehicle, "vehicle sold successfully")
    ); 

}); 

const myCars = asyncHandler(async(req, res) => {
    {}
});

const aboutMe = asyncHandler(async (req, res) => {
    const userData = await req.user; 
    res.status(200).json(
        new APIResponse(200, userData, "user about me page")
    ); 
});

export {
    registerUser,
    loginUser,
    viewAllCars,
    getDealsForCar,
    buyCar,
    aboutMe
};

