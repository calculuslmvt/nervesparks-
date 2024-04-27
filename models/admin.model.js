export const adminSchema = {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['admin_email', 'password'],
        properties: {
          admin_email: {
            bsonType: 'string',
            description: 'Admin ID must be a string and is required'
          },
          password: {
            bsonType: 'string',
            description: 'Password must be a string and is required'
          },
          token: {
            bsonType: 'string',
            description: 'token value for user'
          },
        }
      }
    }
  };
  