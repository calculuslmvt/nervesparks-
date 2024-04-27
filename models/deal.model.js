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
  