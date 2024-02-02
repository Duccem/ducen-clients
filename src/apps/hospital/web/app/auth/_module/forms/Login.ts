import { required } from 'ui';

export const Login = {
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  password: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
