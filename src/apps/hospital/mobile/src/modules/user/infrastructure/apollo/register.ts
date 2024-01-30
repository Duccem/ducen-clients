import { gql } from '@apollo/client';
export const REGISTER = gql`
  mutation userRegister($member: UserRegister) {
    userRegister(member: $member)
  }
`;
