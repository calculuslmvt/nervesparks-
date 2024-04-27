export const userSchema = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['user_email', 'password'],
        properties: {
          user_email: {
            bsonType: 'string',
            description: 'User email must be a string and is required'
          },
          user_id: {
            bsonType: 'string',
            description: 'User ID must be a string and is required'
          },
          user_location: {
            bsonType: 'string',
            description: 'User location must be a string'
          },
          user_info: {
            bsonType: 'object',
            description: 'User info must be an object'
          },
          password: {
            bsonType: 'string',
            description: 'User password must be a string'
          },
          token: {
            bsonType: 'string',
            description: 'token value for user'
          },
          vehicle_info: {
            bsonType: 'array',
            description: 'token value for user'
          },
        }
      }
    }
  };
  