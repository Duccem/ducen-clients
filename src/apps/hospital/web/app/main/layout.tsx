
import { Sidebar } from '../_shared/components/Sidebar/Sidebar';
import styles from './layout.module.css';
export default function Layout({ children }: { children: React.ReactNode }) {;
  return (
    <>
      <div className={styles.main_layout}>
        <Sidebar/>
        {children}
      </div>
    </>
  );
}
