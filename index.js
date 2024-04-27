import express from "express";
import dotenv from 'dotenv'; 
import connect from "./database/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import dealershipRouter from "./routes/dealer.routes.js";
import cors from "cors"; 

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use("/api/user", userRouter);
app.use("/api/dealership", dealershipRouter)
app.use("/api/admin", adminRouter);


// initiating data-base 
connect(); 




// console.log(usersCollection);
// const newCars = [
// {
//     car_id: 'car001',
//     type: 'SUV',
//     name: 'Ford Explorer',
//     model: '2022',
//     car_info: {
//     color: 'black',
//     mileage: 5000,
//     features: ['AWD', 'Leather Seats', 'Sunroof']
//     }
// },
// {
//     car_id: 'car002',
//     type: 'Sedan',
//     name: 'Honda Accord',
//     model: '2021',
//     car_info: {
//     color: 'white',
//     mileage: 12000,
//     features: ['Bluetooth', 'Backup Camera']
//     }
// },
// {
//     car_id: 'car003',
//     type: 'Truck',
//     name: 'Ram 1500',
//     model: '2020',
//     car_info: {
//     color: 'red',
//     mileage: 20000,
//     features: ['Towing Package', 'Bed Liner']
//     }
// },
// {
//     car_id: 'car004',
//     type: 'Electric',
//     name: 'Tesla Model 3',
//     model: '2023',
//     car_info: {
//     color: 'blue',
//     mileage: 1000,
//     features: ['Autopilot', 'Premium Audio']
//     }
// }
// ];
// const responseCar = await carsCollection.insertMany(newCars);
// console.log("Cars added successfully : ", responseCar); 

// const newUser = {
//     user_email: 'john@example.com',
//     user_id: 'user123',
//     user_location: 'New York',
//     user_info: { age: 30, gender: 'male' },
//     password: 'password123',
//     vehicle_info: [
//       {
//         vehicle_id: 'vehicle456',
//         car_id: 'car789',
//         vehicle_info: { year: 2020, make: 'Toyota', model: 'Camry' }
//       }
//     ]
//   };
// const responseUser = await usersCollection.insertOne(newUser);
// console.log("User added successfully : ", responseUser);

// const newDealership = {
//     dealership_email: 'dealership@example.com',
//     dealership_id: 'dealership123',
//     dealership_name: 'ABC Dealership',
//     dealership_location: 'Los Angeles',
//     password: 'password456',
//     dealership_info: { established: 2010, employees: 50 },
//     cars: [],
//     deals: [],
//     sold_vehicles: []
// };
// const responseDealership = await dealershipCollection.insertOne(newDealership);
// console.log("Dealership created scuccessfully : ", responseDealership); 

// const soldVehicle = {
//     vehicle_id: 'sold123',
//     car_id: 'car456',
//     vehicle_info: { year: 2018, make: 'Honda', model: 'Civic' }
// };
  
// await soldVehiclesCollection.insertOne(soldVehicle);
// console.log('Sold vehicle inserted successfully');


// const newSoldVehicle = {
//     vehicle_id: 'sold456',
//     car_id: 'car789',
//     vehicle_info: {
//       year: 2018,
//       make: 'Honda',
//       model: 'Civic'
//     }
//   };

// const dealershipId = 'dealership123'
// const dealership = await dealershipCollection.findOne({ dealership_id: dealershipId });

//   if (dealership) {
//     console.log('Dealership found:', dealership);
//   } else {
//     console.log('Dealership not found');
//   }
  
// const res = await dealershipCollection.updateOne(
//     { dealership_id: dealershipId}, 
//     {$push: { sold_vehicles: newSoldVehicle }}
// );

// console.log(res); 


// const allCars = await carsCollection.find({}).toArray();
// console.log(allCars); 



// const dealer = await dealershipCollection.findOne({dealership_id: dealershipId});
// const soldCars = dealer.sold_vehicles;

// console.log(soldCars); 





app.get('/', (req, res) => {
    res.send("Hello World"); 
});
app.listen(port, () => {
    console.log("app started at port: ", port); 
})
 


