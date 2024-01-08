'use client'
import { useRouter } from "next/navigation";
import { Button, Form, TextInput, useForm } from "ui";
import { useMemberContext } from "../../../../modules/member/MemberContext";
import { EmailForm } from "../forms/EmailForm";

export function RecoveryPasswordEmail() {
  const navigate = useRouter();
  const { handleSubmit, register } = useForm({
    fields: EmailForm,
  });
  const { recoveryPassword } = useMemberContext();
  const submitEmail = (event) => {
    handleSubmit(event, async ({ email }) => {
      await recoveryPassword(email);
      navigate.push('/auth/email-sended');
    });
  }
  return (
    <>
      <Form onSubmit={submitEmail} width={'75%'}>
        <TextInput placeholder="Your email" {...register('email')} />
        <Button type="submit">Identify</Button>
      </Form>
    </>
  );
}
