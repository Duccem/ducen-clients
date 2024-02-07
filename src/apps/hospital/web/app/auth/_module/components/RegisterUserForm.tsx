'use client';
import { Primitives } from 'core';
import { User } from 'hospital';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, CheckInput, DateInput, Form, SelectInput, TextInput, useForm } from 'ui';
import { useUserContext } from '../../../../modules/user/UserContext';
import { useCities } from '../../../_shared/hooks/useCities';
import { useConfData } from '../../../_shared/hooks/useConfData';
import { useCountries } from '../../../_shared/hooks/useCountries';
import { RegisterForm } from '../forms/RegisterForm';

export function RegisterUserForm() {
  const location = useRouter();
  const { countries, phoneCodes } = useCountries();
  const [selectedCity, setSelectedCity] = useState('');
  const { cities } = useCities(selectedCity);
  const { latitude, longitude, lang, theme, timezone } = useConfData()
  const { setPartialUser } = useUserContext()
  const { register, handleSubmit, handleChange, submitting } = useForm({
    validateOn: 'all',
    fields: RegisterForm,
  });
  function handleClickRegister(e) {
    handleSubmit(
      e,
      (data: any) => {
        const user: Partial<Primitives<User>> = {
          name: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
          email: data.email,
          birthDate: new Date(data.birthDate),
          phoneNumber: data.codeNumber.toString() + data.phoneNumber.toString(),
          address: {
            country: data.country,
            city: data.city,
            zipCode: data.zipCode,
            street: data.street,
            coordinates: {
              latitude,
              longitude
            }
          },
          configuration: {
            lang,
            theme,
            timezone
          }
        }
        setPartialUser(user);
        location.push('/auth/create-credentials');
      },
      (values) => {
        console.log(values);
      }
    );
  }
  return (
    <>
      <Form onSubmit={handleClickRegister} width={'75%'} className='mt-[1.25rem]'>
        <TextInput placeholder="First Name" {...register('firstName')} />
        <TextInput placeholder="Last Name" {...register('lastName')} />
        <TextInput placeholder="Email" {...register('email')} />
        <DateInput placeholder="Birth date" {...register('birthDate')} />
        <div className='flex gap-3'>
          <SelectInput
              autocomplete
              className='w-1/6'
              options={phoneCodes}
              {...register('codeNumber')}
              placeholder="Code"
            />
          <TextInput placeholder="Phone Number" className='w-3/6' {...register('phoneNumber')} />
          <SelectInput
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
                { label: 'Other', value: 'OTHER' },
              ]}
              className='w-2/6'
              {...register('gender')}
              placeholder="Gender"
            />
        </div>
        <div className="flex gap-3">
          <SelectInput
            autocomplete
            options={countries}
            {...register('country')}
            onChange={(value: any) => {
              setSelectedCity(value);
              handleChange('country', value);
            }}
            placeholder="Country"
          />
          <SelectInput autocomplete options={cities} {...register('city')} placeholder="City" />
          <TextInput placeholder="Zip Code" {...register('zipCode')} />
          <TextInput placeholder="Street" {...register('street')} />
        </div>
        <CheckInput {...register('terms')} placeholder="Ok with our terms of service" />
        <Button type="submit" className="mt-3" width={'percent.larger'} submitting={submitting}>
          Sign Up
        </Button>
      </Form>
    </>
  );
}
