import { required } from 'ui';

export const Login = {
  identifier: {
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
