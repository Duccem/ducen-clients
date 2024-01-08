/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button, Form, PasswordInput, TextInput, useForm } from 'ui';
import { useGuildContext } from '../../../../modules/guild/GuildContext';
import { useMemberContext } from '../../../../modules/member/MemberContext';
import { useAuthContext } from '../../../../modules/shared/auth/AuthContext';
import { CredentialsForm } from '../forms/CredentialsForm';

export function CreateCredentialsForm() {
  const location = useRouter();
  const { memberState, setCredentials, registerMember, getCredentials } = useMemberContext();
  const { registerGuild } = useGuildContext()
  const { getRegisterType } = useAuthContext()
  const { register, handleSubmit } = useForm({
    validateOn: 'all',
    fields: CredentialsForm,
  });
  useEffect(() => {
    async function registerGuildAdmin() {
      console.log(getCredentials(), getRegisterType())
      if(getCredentials().nickname && getCredentials().password){
        if(getRegisterType() === 'member') {
          await registerMember();
          location.push('/auth/completed')
        } else {
          await registerGuild();
          location.push('/auth/choose-plan')
        }
      }
    }
    registerGuildAdmin();
  }, [memberState.member.nickname, memberState.member.password])
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ identifier, password }) => {
        setCredentials({
          nickname: identifier,
          password
        });
      },
      (values) => console.log(values)
    );
  }
  return (
    <>
      <Form onSubmit={handleCredentialsSubmit} width={'75%'} className='mt-[1.25rem]'>
        <TextInput placeholder="Username" {...register('identifier')} />
        <PasswordInput placeholder="Password" {...register('password')} />
        <PasswordInput placeholder="Confirm Password" {...register('newPassword')} />
        <Button className="mt-5" width={'percent.larger'} type="submit">
          Finish
        </Button>
      </Form>
    </>
  );
}
