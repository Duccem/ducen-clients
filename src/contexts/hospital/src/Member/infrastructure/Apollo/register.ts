import { gql } from '@apollo/client';
export const REGISTER = gql`
  mutation memberRegister($member: MemberRegister) {
    memberRegister(member: $member)
  }
`;
