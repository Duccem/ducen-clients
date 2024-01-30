export interface User {
  id?: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  birthDate: Date;
  address: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  phoneNumber: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  photo: string;
  configuration: {
    timezone: string;
    theme: string;
    lang: string;
  };
}
