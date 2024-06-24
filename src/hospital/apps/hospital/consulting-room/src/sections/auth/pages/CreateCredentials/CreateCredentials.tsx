
import { useUserContext } from '@/modules/user/UserContext';
import { AnimatedView, Button, Form, TextInput, useForm } from '@ducen/ui-web';
import { useNavigate } from 'react-router-dom';
import { CredentialsForm } from '../../forms/CredentialsForm';
import styles from './styles.module.css';

export function CreateCredentials() {
  const location = useNavigate();
  const { register: registerUser } = useUserContext();
  const { register, handleSubmit, submitting, setSubmitting } = useForm({
    validateOn: 'all',
    fields: CredentialsForm,
  });
  async function handleCredentialsSubmit(e) {
    handleSubmit(
      e,
      async ({ password }) => {
        setSubmitting(true);
        await registerUser(password);
        location('/auth/completed');
      },
      (values) => console.log(values),
    );
  }
  return (
    <>
      <AnimatedView className={styles.credentials__page}>
        <div className={styles.credentials__container}>
          <div className={styles.credentials__header}>
            <p className={styles.credentials__header__title}>Access Credentials</p>
            <p className={styles.credentials__header__subtitle}>Username and password to login</p>
          </div>
          <Form onSubmit={handleCredentialsSubmit} className={styles.credentials__form}>
            <TextInput placeholder="Password" {...register('password')} />
            <TextInput placeholder="Confirm Password" {...register('newPassword')} />
            <Button className={styles.credentials__form__button} type="submit" submitting={submitting}>
              Finish
            </Button>
          </Form>
        </div>
      </AnimatedView>
    </>
  );
}
