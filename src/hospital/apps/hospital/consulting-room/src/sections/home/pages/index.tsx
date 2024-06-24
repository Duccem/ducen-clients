import { UserProvider } from '@/modules/user/UserContext';
import { AuthGuard } from '@/modules/user/components/AuthGuard';
import { Outlet } from 'react-router-dom';

export function HomeIndex() {
  return (
    <>
      <UserProvider>
        <AuthGuard redirect={'/auth/login'}>
          <Outlet></Outlet>
        </AuthGuard>
      </UserProvider>
    </>
  );
}
