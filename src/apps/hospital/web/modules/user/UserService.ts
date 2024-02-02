export const useUserService = () => {
  return {
    login: async (email: string, password: string) => {
      console.log('login');
    },
  };
};
