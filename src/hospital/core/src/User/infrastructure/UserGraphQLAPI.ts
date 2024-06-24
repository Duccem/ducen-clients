import { useLazyQuery, useMutation } from '@apollo/client';
import { Primitives } from '@ducen/shared';
import { SaveCurrentUser } from '../application/SaveCurrentUser';
import { User } from '../domain/User';
import { useUserContext } from './UserContext';
import { CHANGE_PASSWORD } from './queries/change-password';
import { LOGIN } from './queries/login';
import { RECOVERY_PASSWORD } from './queries/recovery-password';
import { REGISTER } from './queries/register';

export const useLogin = (email: string, password: string) => {
  const { repository } = useUserContext();
  const useCase = new SaveCurrentUser(repository);
  const [login] = useLazyQuery<{ user: Primitives<User>; token: string }>(LOGIN, {
    variables: { identifier: email, password },
  });
  return async () => {
    const response = await login();
    useCase.run({
      user: response.data.user,
      token: response.data.token,
    });
  };
};

export const useRegister = (user: Primitives<User>) => {
  const [register] = useMutation<void>(REGISTER, { variables: { user } });
  return async () => {
    await register();
  };
};

export const useRecoveryPassword = (email: string) => {
  const [recoveryPassword] = useMutation<void>(RECOVERY_PASSWORD, { variables: { email } });
  return async () => {
    await recoveryPassword();
  };
};

export const useChangePassword = (userId: string, newPassword: string, oldPassword: string) => {
  const [changePassword] = useMutation<void>(CHANGE_PASSWORD, { variables: { userId, newPassword, oldPassword } });
  return async () => {
    await changePassword();
  };
};
