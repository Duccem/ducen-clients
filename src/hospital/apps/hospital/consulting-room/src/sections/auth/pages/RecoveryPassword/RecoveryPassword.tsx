import { AnimatedView, Button, Form, TextInput, useForm } from '@ducen/ui-web';
import { useNavigate } from 'react-router-dom';
import { EmailForm } from '../../forms/EmailForm';
import styles from './styles.module.css';
import { useUserContext } from '@/modules/user/UserContext';

export function RecoveryPassword() {
  const navigate = useNavigate();
  const { handleSubmit, register, submitting } = useForm({
    fields: EmailForm,
  });
  const { recoveryPassword } = useUserContext();
  const submitEmail = (event) => {
    handleSubmit(event, async ({ email }) => {
      await recoveryPassword(email);
      navigate('/auth/email-sended');
    });
  }
  return (
    <>
      <AnimatedView className={styles.recovery__page}>
        <div className={styles.recovery__header}>
          <p className={styles.recovery__header__title}>Introduce your email</p>
        </div>
        <Form onSubmit={submitEmail} className={styles.recovery__form}>
          <TextInput placeholder="Your email" {...register('email')} />
          <Button type="submit" submitting={submitting}>Send email</Button>
        </Form>
      </AnimatedView>
    </>
  );
}
