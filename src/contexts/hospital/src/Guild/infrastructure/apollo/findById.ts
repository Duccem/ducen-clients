import { gql } from '@apollo/client';
export const FIND_BY_ID = gql`
  query guildInformation($guildId: String) {
    guildInformation(guildId: $guildId) {
      id
      name
      description
      foundationDate
      objective
      country
      email
      image
      configuration {
        plan
        category
        timezone
        lang
      }
    }
  }
`;
