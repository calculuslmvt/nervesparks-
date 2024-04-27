import connect from "../database/index.js";
import { userSchema, 
        dealershipSchema,
        carSchema,
        soldVehicleSchema, 
        adminSchema,
        dealSchema} from "../models/index.js";


const getUsersCollection = async () => {

    const database = await connect();
    const usersCollection = await database.createCollection('user', userSchema);
    //await usersCollection.createIndex({ user_id: 1 }, { unique: true });
    return usersCollection; 
}

const getCarsCollection = async () => {
    const database = await connect();
    const carsCollection = await database.createCollection('cars', carSchema)
    //await carsCollection.createIndex({ car_id: 1 }, { unique: true });
    return carsCollection; 
}

const getDealershipCollection = async () => {
    const database = await connect();
    const dealershipCollection = await database.createCollection('dealership', dealershipSchema);
    //await dealershipCollection.createIndex({ dealership_id: 1 }, { unique: true });
    return dealershipCollection; 
}


const getSoldVehiclesCollection = async () => {
    const database = await connect();
    const soldVehiclesCollection = await database.createCollection('sold_vehicles', soldVehicleSchema);
    //await soldVehiclesCollection.createIndex({ vehicle_id: 1 }, { unique: true });
    return soldVehiclesCollection; 
}

const getAdminCollection = async () => {
    const database = await connect();
    const adminCollection = await database.createCollection('admin', adminSchema);
    //await adminCollection.createIndex({ admin_id: 1 }, {unique: true });
    return adminCollection; 
}

const getDealCollection = async () => {
    const database = await connect();
    const dealCollection = await database.createCollection('deal', dealSchema);
    //await dealCollection.createIndex({ deal_id: 1 }, {unique: true});
    return dealCollection; 

}

export {
    getUsersCollection,
    getCarsCollection,
    getDealershipCollection,
    getSoldVehiclesCollection,
    getAdminCollection,
    getDealCollection
}
