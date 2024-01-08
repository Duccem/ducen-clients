import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";
export function SidebarItem({ icon, name, url }: { icon: React.ReactNode; name: string; url: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === url;
  const goTo = () => router.push(url);
  return (
    <li className={styles.sidebar__item  + ` ${isActive ? styles.sidebar__item_active : ''}`} onClick={goTo} aria-label={name}>
      {icon}
      <p className={styles.sidebar__item_text}>{name}</p>
    </li>
  );
}
