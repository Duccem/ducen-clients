import { password, required } from 'ui';

export const formRegisterCredentials = {
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
      password: (v: string) => password(v),
    },
  },
  confirmPassword: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
