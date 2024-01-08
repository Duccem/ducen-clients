import { gql } from '@apollo/client';

export const REGISTER_GUILD = gql`
  mutation guildRegister($guild: GuildRegister) {
    guildRegister(guild: $guild)
  }
`;
