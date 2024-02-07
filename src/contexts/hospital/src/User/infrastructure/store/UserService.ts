import { User, UserClientRepository } from 'hospital';
import uuid from 'react-native-uuid';
import { UserStoreActions } from './UserStore';

export function useUserService(
  { setToken, setUser, userState, setPartialUser }: UserStoreActions,
  userRepository: UserClientRepository
) {
  return {
    login: async (email: string, password: string) => {
      const response = await userRepository.login(email, password);
      if (response) {
        setToken(response.token);
        setUser(response.user.toPrimitives());
      }
    },
    register: async () => {
      const saveUser = { ...userState.user, id: uuid.v4().toString(), photo: 'image.jpg' };
      await userRepository.create(User.fromPrimitives(saveUser));
      setPartialUser({ ...saveUser, password: '' });
    },
  };
}

export type UserServices = ReturnType<typeof useUserService>;
