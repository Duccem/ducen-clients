import { gql } from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation changePassword($userId: String, $newPassword: String, $oldPassword: String) {
    changePassword(userId: $userId, newPassword: $newPassword, oldPassword: $oldPassword)
  }
`;
