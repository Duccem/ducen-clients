'use client'
import { useRouter } from 'next/navigation';
import { Button, Form, TextInput, useForm } from 'ui';
import { useGuildContext } from '../../../../modules/guild/GuildContext';
import { GuildIdentify } from '../forms/GuildIdentify';

export function IdentifyGuildForm() {
  const navigate = useRouter();
  const { handleSubmit, register } = useForm({
    fields: GuildIdentify,
  });
  const { identifyGuild } = useGuildContext();
  const validateId = (event: any) => {
    handleSubmit(event, async (data) => {
      const identified = await identifyGuild(data.id);
      if (identified) {
        navigate.push('/auth/register-member');
        return;
      }
    });
  };
  return (
    <>
      <Form onSubmit={validateId} width={'75%'}>
        <TextInput placeholder="Guild identification" {...register('id')} />
        <Button type="submit">Identify</Button>
      </Form>
    </>
  );
}
