export const soldVehicleSchema = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['car_id'],
        properties: {
          vehicle_id: {
            bsonType: 'string',
            description: 'Vehicle ID must be a string and is required'
          },
          car_id: {
            bsonType: 'string',
            description: 'Car ID must be a string and is required'
          },
          vehicle_info: {
            bsonType: 'object',
            description: 'Vehicle info must be an object'
          }
        }
      }
    }
  };
  
  