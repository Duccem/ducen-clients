'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, Form, PasswordInput, useForm } from 'ui';
import { useAuthContext } from '../../../../modules/auth/AuthContext';
import { CredentialsForm } from '../forms/CredentialsForm';

export function CreateCredentialsForm() {
  const location = useRouter();
  const {  authState, register: registerUser, setPartialUser } = useAuthContext()
  const { register, handleSubmit, setError, submitting, setSubmitting } = useForm({
    validateOn: 'all',
    fields: CredentialsForm,
  });
  useEffect(() => {
    if(authState.user.password !== '') {
      async function sendRegister() {
        setSubmitting(true);
        await registerUser();
        location.push('/auth/completed')
      }
      sendRegister();
    }
  }, [authState.user.password]);
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ newPassword, password }) => {
        if(newPassword === password) {
          setPartialUser({
            password: password
          })
          console.log(authState.user);
        }else {
          setError('newPassword', 'Passwords do not match');
        }
      },
      (values) => console.log(values)
    );
  }
  return (
    <>
      <Form onSubmit={handleCredentialsSubmit} width={'75%'} className='mt-[1.25rem]'>
        <PasswordInput placeholder="Password" {...register('password')} />
        <PasswordInput placeholder="Confirm Password" {...register('newPassword')} />
        <Button className="mt-5" width={'percent.larger'} type="submit" submitting={submitting}>
          Finish
        </Button>
      </Form>
    </>
  );
}
