import { SidebarLast } from './SidebarLast';
import { SidebarMain } from './SidebarMain';
import { SidebarSub } from './SidebarSub';
import styles from './sidebar.module.css';
export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div>
        <h1 className={styles.sidebar__logo}>Ducen</h1>
        <div className={styles.sidebar__main_menu}>
          <p className={styles.sidebar__main_menu_title}>MAIN MENU</p>
          <ul className={styles.sidebar__main_menu_items}>
            <SidebarMain />
          </ul>
        </div>
      </div>
      <div className={styles.sidebar__sub_menu}>
        <p className={styles.sidebar__sub_menu_title}>FAVORITES</p>
        <ul className={styles.sidebar__sub_menu_items}>
          <SidebarSub />
        </ul>
      </div>
      <div className={styles.sidebar__last_menu}>
        <ul className={styles.sidebar__last_menu__items}>
          <SidebarLast />
        </ul>
      </div>
    </aside>
  );
}
