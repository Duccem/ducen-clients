'use client';
import { useRouter } from 'next/navigation';
import { Button, Form, PasswordInput, TextInput, useForm } from 'ui';
import { useUserContext } from '../../../../modules/user/UserContext';
import { Login } from '../forms/Login';

export function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit, submitting } = useForm({
    validateOn: 'all',
    fields: Login,
  });
  const { login } = useUserContext();
  async function dispatchLogin(event: any) {
    handleSubmit(event, async ({ identifier, password }: any) => {
      try {
        await login(identifier, password);
        router.push('/main')
      } catch (error) {
        console.log(error)
      }
    });
  }
  function enterHandler(event: any) {
    if (event.key === 'Enter') dispatchLogin(event);
  }
  return (
    <>
      <Form onSubmit={dispatchLogin} className='mt-[1.25rem]'>
        <TextInput placeholder="Username" id="username" {...register('email')} />
        <PasswordInput placeholder="Password" {...register('password')} onKeyDown={enterHandler} />
        <Button width={'percent.larger'} type="submit" submitting={submitting}>
          Log In
        </Button>
      </Form>
    </>
  );
}
