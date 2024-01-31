import { password } from '../../shared/validators/password';
import { required } from '../../shared/validators/required';

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
