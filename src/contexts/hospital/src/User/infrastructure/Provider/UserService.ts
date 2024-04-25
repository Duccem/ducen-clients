import { ChangePassword } from '../../application/ChangePassword/ChangePassword';
import { CreateUser } from '../../application/Create/Create';
import { Login } from '../../application/Login/Login';
import { RecoveryPassword } from '../../application/RecoveryPassword/RecoveryPassword';
import { UserRepository } from '../../domain/UserRepository';
import { UserStoreActions } from './UserStore';

export function useUserService(
  { setUser, userState, setPartialUser, setToken }: UserStoreActions,
  userRepository: UserRepository
) {
  const login = new Login(userRepository);
  const register = new CreateUser(userRepository);
  const recoveryPassword = new RecoveryPassword(userRepository);
  const changePassword = new ChangePassword(userRepository);
  return {
    login: async (email: string, password: string) => {
      const response = await login.run(email, password);
      if (response) {
        setUser(response.user.toPrimitives());
        setToken(response.token);
      }
    },
    register: async (password: string) => {
      const saveUser = { ...userState.user, photo: 'image.jpg' };
      await register.run(saveUser, password);
      setPartialUser({ ...saveUser });
    },
    recoveryPassword: async (email: string) => {
      await recoveryPassword.run(email);
    },
    changePassword: async (userId: string, password: string, oldPassword: string) => {
      await changePassword.run(userId, password, oldPassword);
    },
  };
}

export type UserServices = ReturnType<typeof useUserService>;
