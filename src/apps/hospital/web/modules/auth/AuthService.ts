import { Uuid } from 'core';
import { User } from 'hospital';
import { useRepositoryContext } from '../shared/RepositoryContext';
import { AuthStoreActions } from './AuthState';

export function useAuthService({ setToken, setUser, authState, setPartialUser }: AuthStoreActions) {
  const { userRepository } = useRepositoryContext();
  return {
    login: async (email: string, password: string) => {
      const response = await userRepository.login(email, password);
      if (response) {
        setToken(response.token);
        setUser(response.user.toPrimitives());
      }
    },
    register: async () => {
      try {
        const saveUser = { ...authState.user, id: Uuid.random().toString(), photo: 'image.jpg' };
        await userRepository.create(User.fromPrimitives(saveUser));
        setPartialUser({ ...saveUser, password: '' });
      } catch (error) {
        console.log(error);
      }
    },
  };
}
export type AuthServices = ReturnType<typeof useAuthService>;
