import { Login } from '../../../modules/user/application/Login';
import { useServicesContext } from '../../shared/state/ServicesContext';
import { AuthStoreActions } from './AuthState';

export function useAuthService({ setToken, setUser }: AuthStoreActions) {
  const { userRepository } = useServicesContext();
  return {
    login: async (email: string, password: string) => {
      const login = new Login(userRepository);
      const response = await login.run(email, password);
      console.log(response);
      if (response) {
        setToken(response.token);
        setUser(response.user);
      }
    },
  };
}

export type AuthServices = ReturnType<typeof useAuthService>;
