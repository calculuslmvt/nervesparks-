export const dealershipSchema = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['dealership_email', 'dealership_name'],
        properties: {
          dealership_email: {
            bsonType: 'string',
            description: 'Dealership email must be a string and is required',
          },
          dealership_id: {
            bsonType: 'string',
            description: 'Dealership ID must be a string and is required'
          },
          dealership_name: {
            bsonType: 'string',
            description: 'Dealership name must be a string and is required'
          },
          dealership_location: {
            bsonType: 'string',
            description: 'Dealership location must be a string'
          },
          password: {
            bsonType: 'string',
            description: 'Dealership password must be a string'
          },
          dealership_info: {
            bsonType: 'object',
            description: 'Dealership info must be an object'
          },
          cars: {
            bsonType: 'array',
            description: 'Cars must be an array'
          },
          deals: {
            bsonType: 'array',
            description: 'Deals must be an array'
          },
          sold_vehicles: {
            bsonType: 'array',
            description: 'Sold vehicles must be an array'
          },
          token: {
            bsonType: 'string',
            description: 'token value for user'
          },
        }
      }
    }
  };
  
  