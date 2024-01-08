'use client';
import { useRouter } from 'next/navigation';
import { Button, Form, PasswordInput, TextInput, useForm } from 'ui';
import { useMemberContext } from '../../../../modules/member/MemberContext';
import { Login } from '../forms/Login';

export function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm({
    validateOn: 'all',
    fields: Login,
  });
  const { login } = useMemberContext();
  async function dispatchLogin(event: any) {
    handleSubmit(event, async ({ identifier, password }: any) => {
      await login(identifier, password);
      router.push('/main')
    });
  }
  function enterHandler(event: any) {
    if (event.key === 'Enter') dispatchLogin(event);
  }
  return (
    <>
      <Form onSubmit={dispatchLogin} className='mt-[1.25rem]'>
        <TextInput placeholder="Username" id="username" {...register('identifier')} />
        <PasswordInput placeholder="Password" {...register('password')} onKeyDown={enterHandler} />
        <Button width={'percent.larger'} type="submit">
          Log In
        </Button>
      </Form>
    </>
  );
}
