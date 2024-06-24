import { required } from '@ducen/ui-native';

export const formVerificationCode = {
  code: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
