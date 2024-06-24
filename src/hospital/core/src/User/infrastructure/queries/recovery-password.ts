import { gql } from '@apollo/client';

export const RECOVERY_PASSWORD = gql`
  mutation recoveryPassword($email: String) {
    recoveryPassword(email: $email)
  }
`;
