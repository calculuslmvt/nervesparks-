import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const url = process.env.MONGODB_URL; 

console.log(url); 

const client = new MongoClient(url);

export default async function connect() {
    try {
        await client.connect();
        const database = client.db("Cluster0");
        console.log(" MongoDB Success : Connected to MongoDB");
        //console.log(database); 
        return database; 
        //console.log(client, database); 
    } catch (error) {
        console.log("MongoDB Error : ", error); 
        process.exit(1); 
    }
};




