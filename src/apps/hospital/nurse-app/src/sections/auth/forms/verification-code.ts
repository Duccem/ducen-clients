import { required } from '@ducen-clients/ui-native';

export const formVerificationCode = {
  code: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
};
