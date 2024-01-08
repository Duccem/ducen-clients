'use client';
import { Primitives } from 'core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Member } from 'hospital';
import { Button, CheckInput, DateInput, Form, SelectInput, TextInput, useForm } from 'ui';
import { useMemberContext } from '../../../../modules/member/MemberContext';
import { useCities } from '../../../_shared/hooks/useCities';
import { useConfData } from '../../../_shared/hooks/useConfData';
import { useCountries } from '../../../_shared/hooks/useCountries';
import { MemberForm } from '../forms/MemberForm';

export function RegisterMemberForm() {
  const location = useRouter();
  const { countries } = useCountries();
  const [selectedCity, setSelectedCity] = useState('');
  const { cities } = useCities(selectedCity);
  const { setMember } = useMemberContext();
  const { latitude, longitude, lang, theme, timezone } = useConfData()
  const { register, handleSubmit, handleChange } = useForm({
    validateOn: 'all',
    fields: MemberForm,
  });
  function handleClickRegister(e) {
    handleSubmit(
      e,
      (data: any) => {
        const user: Partial<Primitives<Member>> = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthDate: data.birthDate,
          address: {
            country: data.country,
            city: data.city,
            postal: data.postal,
            direction: data.direction,
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
        setMember(user as Primitives<Member>);
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
        <div className="flex gap-3">
          <SelectInput
            autocomplete
            options={countries}
            {...register('country')}
            onChange={(value: any) => {
              setSelectedCity(value);
              handleChange('country', value);
            }}
            placeholder="Select your country"
          />
          <SelectInput autocomplete options={cities} {...register('city')} placeholder="Select your city" />
          <TextInput placeholder="Postal" {...register('postal')} />
        </div>
        <TextInput placeholder="Direction" {...register('direction')} />
        <CheckInput {...register('terms')} placeholder="Ok with our terms of service" />
        <Button type="submit" className="mt-3" width={'percent.larger'}>
          Sign Up
        </Button>
      </Form>
    </>
  );
}
