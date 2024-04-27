# Express.js Backend Server Documentation

Welcome to the documentation for our Express.js backend server. This server provides endpoints for interacting with our application's data and business logic.

## Table of Contents

1. [Constants](#constants)
2. [Controllers](#controllers)
3. [Database](#database)
4. [Middleware](#middleware)
5. [Database Models](#database-models)
6. [Routes](#routes)
7. [Utilities](#utilities)

---

## Controllers
This contains Express.js route handlers for a car dealership application. The handlers handle user registration, login, fetching all available cars, getting deals for a specific car, purchasing a car, and retrieving user information. The code uses various utilities and helper functions from separate files, such as `apiResponse.js`, `asyncHandler.js`, `apiError.js`, `jwtHandler.js`, and `databaseCollections.js`.

Here's a summary of the main functions:

1. `registerUser`: Handles user registration by validating the input data, checking if the user already exists, hashing the password, and creating a new user in the database.

2. `loginUser`: Handles user login by validating the input credentials, checking if the user exists, verifying the password, and generating a JSON Web Token (JWT) for the authenticated user.

3. `viewAllCars`: Fetches and returns all available cars from the database.

4. `getDealsForCar`: Retrieves and returns all deals associated with a specific car.

5. `buyCar`: Handles the purchase of a car by validating the deal, marking the deal as invalid, creating a new sold vehicle document, and updating the dealership and user collections with the sold vehicle information.

6. `aboutMe`: Retrieves and returns the user's information.

```javascript
import { APIResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { getJsonWebToken } from "../utils/jwtHandler.js";
import { getCarsCollection, getDealCollection, getDealershipCollection, getSoldVehiclesCollection, getUsersCollection } from "../utils/databaseCollections.js";
import bcryptjs from 'bcryptjs';
import { ObjectId } from "mongodb";

const registerUser = asyncHandler(async (req, res) => {
    // Code for registerUser handler
});

const loginUser = asyncHandler(async (req, res) => {
    // Code for loginUser handler
});

const viewAllCars = asyncHandler(async(req, res) => {
    // Code for viewAllCars handler
});

const getDealsForCar = asyncHandler(async(req, res) => {
    // Code for getDealsForCar handler
});

const buyCar = asyncHandler(async(req, res) => {
    // Code for buyCar handler
});

const myCars = asyncHandler(async(req, res) => {
    {}
});

const aboutMe = asyncHandler(async (req, res) => {
    // Code for aboutMe handler
});

export {
    registerUser,
    loginUser,
    viewAllCars,
    getDealsForCar,
    buyCar,
    aboutMe
};

```

## Database
Using MongoDB native drivers All database schema's were designed. 
### Example: 
```
export const dealSchema = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['deal_info'],
      properties: {
        deal_id: {
          bsonType: 'string',
          description: 'Vehicle ID must be a string and is required'
        },
        car_id: {
          bsonType: 'string',
          description: 'Car ID must be a string and is required'
        },
        deal_info: {
          bsonType: 'object',
          description: 'Vehicle info must be an object'
        }
      }
    }
  }
};
```
This code defines a schema for a MongoDB collection called deal using the $jsonSchema operator. The schema specifies that each document in the collection must be an object (bsonType: 'object') and must have a field named deal_info (required: ['deal_info']).
## Middleware
JWT Middleware for Authorization
This module contains middleware functions for verifying JSON Web Tokens (JWT) used for authorization in the Express.js backend server.

Functionality
verifyUserJWT: Middleware function to verify JWT for user authentication.
verifyDealershipJWT: Middleware function to verify JWT for dealership authentication.
verifyAdminJWT: Middleware function to verify JWT for admin authentication.
Implementation
These middleware functions extract the JWT from the request cookies, decode and verify it using the provided token secret, and retrieve the corresponding user, dealership, or admin information from the database. If the token is valid and the user exists, the middleware adds the user information to the request object (req.user) and calls the next middleware in the chain. If the token is invalid or the user does not exist, an unauthorized error (401) is thrown.

