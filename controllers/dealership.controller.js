import { APIError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/apiResponse.js";
import { getJsonWebToken } from "../utils/jwtHandler.js";
import { getCarsCollection, getDealCollection, getDealershipCollection } from "../utils/databaseCollections.js";
import bcryptjs from 'bcryptjs'; 
import { ObjectId } from "mongodb";

const registerDealership = asyncHandler(async (req, res)=> {
    console.log(req.body);

    const newDealershipData = req.body;
    const {dealership_email, password, dealership_name} = newDealershipData;

    // validation 
    if(
        [dealership_email, password, dealership_name].some((value) => value?.trim() === "" || value === undefined)
    ) {
        throw new APIError(400, "* fields are required"); 
    }

    const dealershipCollection = await getDealershipCollection();
    const alreadyUser = await dealershipCollection.findOne({dealership_email: dealership_email});
    if(alreadyUser) {
        throw new APIError(400, "dealership already present"); 
    }

    // hashing password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt); 
    newDealershipData.password = hashPassword

    // Creating new user
    await dealershipCollection.insertOne(newDealershipData);
    const newdealership = await dealershipCollection.findOne({dealership_email: dealership_email});
     
    const createdDealership = {
        dealership_email: newdealership.dealership_email,
        dealership_name: newdealership.dealership_name
    }
    return res.status(201).json(
        new APIResponse(200, createdDealership, "New dealership created successfully" )
    );
});


const loginDealership = asyncHandler(async (req, res) => {
    
    const {dealership_email, password} = await req.body;
    console.log(req.body); 

    if(!dealership_email || !password) {
        throw new APIError(400, "Enter dealership_email and password");  
    }

    const dealershipCollection = await getDealershipCollection();
    const dealership = await dealershipCollection.findOne({dealership_email: dealership_email});

    // validation 
    if(!dealership) {
        throw new APIError(400, "dealership does not exist"); 
    }

    const isValidPassword  = await bcryptjs.compare(password, dealership.password); 

    if(!isValidPassword) {
        throw new APIError(400, "invalid credentials"); 
    }

    // Set jwt to the user

    //  const user = await userCollection
    //                 .findOne({user_email: email}, {
    //                     projection: {password:0}
    //                 });
    console.log(dealership); 

    const token = await getJsonWebToken({type :"dealership", agent: dealership});
    await dealershipCollection.updateOne(
        {dealership_email: dealership_email},
        {$set: {token: token}},
        {projection: {password:0}}
    )

    const loginDealership = {
        dealership_email: dealership.dealership_email,
        dealership_name: dealership.dealership_id
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
        new APIResponse(200, loginDealership, "Login successfull")
     );
    //const user = 
    //const token = getJsonWebToken("user", user  )
});

const addCar = asyncHandler(async(req, res) => {
    const {carDetails, dealDetails} = await req.body;
   
    const carsCollection = await getCarsCollection();
    const dealCollection = await getDealCollection();


    const car = await carsCollection.findOne({car_id: carDetails?.car_id});
    const deal = await dealCollection.findOne({deal_id: dealDetails.deal_id}); 

    if(car) {
        throw new APIError(400, "car already exists"); 
    }

    if(deal) {
        throw new APIError(400, "deal already exists"); 
    }
    
    const deal_info = dealDetails?.deal_info;
    const new_deal_info = {
        ...deal_info,
        dealership_id: req.user?._id
    };
    const newDealDetails = {
        ...dealDetails,
        deal_info: new_deal_info
    }; 

    const {insertedId} = await carsCollection.insertOne(carDetails);
    console.log(insertedId); 

    await dealCollection.insertOne(newDealDetails);  

    const dealershipCollection = await getDealershipCollection();

    const result = await dealershipCollection.updateOne(
        { _id: new ObjectId(req.user?._id) },
        { $push: {cars : insertedId, deals: dealDetails.deal_id}}
    ); 
    console.log(result); 
// const res = await dealershipCollection.updateOne(
//     { dealership_id: dealershipId}, 
//     {$push: { sold_vehicles: newSoldVehicle }}
// );
    //await dealCollection.insertOne(dealDetails);

    res.status(200).json(
        new APIResponse(200, "Car and deal added Successfully" )
    );
});

const allDeals = asyncHandler(async (req, res) => {
    const carIds = req.user.cars ;
    console.log(carIds); 

    let cars = [];
    const carsCollection = await getCarsCollection(); 
    await Promise.all(
        carIds.map( async (value) => {
            const car = await carsCollection.findOne({_id: value});
            cars.push(car); 
        })
    );

    console.log(cars);
    res.status(200).json(
        new APIResponse(200, cars)
    ); 
})

const deleteDeal = asyncHandler(async (req, res) => {
    const newCars = req.user?.cars?.filter((value) => value !== req.body);

    const dealershipCollection = await getDealershipCollection();
    await dealershipCollection.updateOne(
        {_id: new ObjectId(req.user?._id)},
        {$set: {cars: newCars}}
    );

    res.status(200).json(
        new APIResponse(200, newCars, "deal deleted successfully")
    ); 
});

const aboutMe = asyncHandler(async (req, res) => {
    const dealershipData = await req.user; 
    res.status(200).json(
        new APIResponse(200, dealershipData, "user about me page")
    );  
});

const viewAllCars = asyncHandler(async(req, res) => {
    const carsCollection = await getCarsCollection();
    const cars = await carsCollection.find({}).toArray();

    res.status(200).json(
        new APIResponse(200, cars, "Cars fetched Successfully")
    ); 
});

const createNewDeal = asyncHandler(async (req, res) => {
    const dealDetails = await req.body;

    const dealInfo = dealDetails.deal_info;
    const newDealInfo = {
        ...dealInfo,
        dealership_id: req.user?._id,
        name: req.user?.dealership_name,
        isDealValid: true
    }
    const newDealDetails = {
        ...dealDetails,
        deal_info: newDealInfo
    };

    const dealCollection = await getDealCollection();
    const {insertedId} = await dealCollection.insertOne(newDealDetails); 

    const dealershipCollection = await getDealershipCollection();
    console.log(dealDetails); 
    await dealershipCollection.updateOne(
        { _id: new ObjectId(req.user?._id) },
        { $push: {cars : dealDetails?.car_id, deals: insertedId}}
    ); 

    res.status(200).json(
        new APIResponse(200, "deal created successfully")
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

});

const removeDeal =  asyncHandler(async(req, res)=> {

    try {
        const {dealId} = await req.body;
        const dealCollection = await getDealCollection();
        await dealCollection.deleteOne({_id: new ObjectId(dealId)});

        return res.status(200).json(
            new APIResponse(200, "Deal deleted Successfully")
        );
    } catch (error) {
        console.log(error.message); 
    }
   

})

export {
    registerDealership,
    loginDealership,
    addCar,
    allDeals,
    createNewDeal, 
    viewAllCars,
    getDealsForCar,
    removeDeal,
    aboutMe
}