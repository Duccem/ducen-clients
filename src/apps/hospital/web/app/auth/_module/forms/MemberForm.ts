import { required } from 'ui';

export const MemberForm = {
  firstName: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  lastName: {
    value: '',
  },
  email: {
    value: '',
    validators: {
      required: (v: string) => required(v),
    },
  },
  birthDate: {
    value: '',
  },
  country: {
    value: '',
  },
  city: {
    value: '',
  },
  postal: {
    value: '',
  },
  direction: {
    value: '',
  },
  terms: {
    value: false,
    validators: {
      required: (v: string) => required(v),
    },
  },
};
