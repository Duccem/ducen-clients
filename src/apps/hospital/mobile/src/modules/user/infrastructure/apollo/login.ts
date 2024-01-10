import { gql } from '@apollo/client';
export const LOGIN = gql`
  query login($identifier: String, $password: String) {
    login(identifier: $identifier, password: $password) {
      token
      user {
        id
        email
        name {
          firstName
          lastName
        }
        gender
        birthDate
        photo
        phoneNumber
        address {
          city
          country
          street
          zipCode
          coordinates {
            longitude
            latitude
          }
        }
        configuration {
          lang
          theme
          timezone
        }
        createdAt
        updatedAt
      }
    }
  }
`;
