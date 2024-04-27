export const carSchema = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
          car_id: {
            bsonType: 'string',
            description: 'Car ID must be a string and is required'
          },
          type: {
            bsonType: 'string',
            description: 'Car type must be a string'
          },
          name: {
            bsonType: 'string',
            description: 'Car name must be a string'
          },
          model: {
            bsonType: 'string',
            description: 'Car model must be a string'
          },
          car_info: {
            bsonType: 'object',
            description: 'Car info must be an object'
          }
        }
      }
    }
  };