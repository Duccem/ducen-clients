import { Metadata } from 'next';
import banner from '../../public/images/Group 8.png';
import { BackButton } from './_module/components/BackButton';
import styles from './layout.module.css';
export const metadata: Metadata = {
  title: 'Start your adventure',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.auth_layout}>
        <div className={styles.auth_layout__left}>
          <div className={styles.auth_layout__header}>
            <h1 className={styles.auth_layout__logo}>Helsa</h1>
            <BackButton to={'/auth/login'} text={'Back to login'}></BackButton>
          </div>
          <div className={styles.auth_layout__content}>
            {children}
          </div>
        </div>
        <div className={styles.auth_layout__right}>
          <div className={styles.auth_layout__banner}>
            <img src={banner.src} alt="banner" className={styles.auth_layout__image}></img>
          </div>
        </div>
      </div>
    </>
  );
}
