import uuid from 'react-native-uuid';
import { Login } from '../../../modules/user/application/Login';
import { Register } from '../../../modules/user/application/Register';
import { useServicesContext } from '../../shared/state/ServicesContext';
import { AuthStoreActions } from './AuthState';

export function useAuthService({ setToken, setUser, authState, setPartialUser }: AuthStoreActions) {
  const { userRepository } = useServicesContext();
  return {
    login: async (email: string, password: string) => {
      const login = new Login(userRepository);
      const response = await login.run(email, password);
      if (response) {
        setToken(response.token);
        setUser(response.user);
      }
    },
    register: async () => {
      const register = new Register(userRepository);
      const saveUser = { ...authState.user, id: uuid.v4().toString() };
      await register.run(saveUser);
      setPartialUser({ ...saveUser, password: '' });
    },
  };
}

export type AuthServices = ReturnType<typeof useAuthService>;
