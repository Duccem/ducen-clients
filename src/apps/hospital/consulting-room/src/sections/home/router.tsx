import { HomeIndex } from './pages';
import { Dashboard } from './pages/Dashboard';

export const HomeRouter = {
  path: '/home',
  Component: () => (
      <HomeIndex></HomeIndex>
  ),
  children: [{ path: 'dashboard', Component: Dashboard }],
};
