'use client'
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const pathName = usePathname()
  useEffect(() => {
    const authCheck = () => {
      if(!localStorage.getItem('token') && ['/home'].includes(pathName || '')) {
        setAuthorized(false);
        router.push('/auth/login')
      }else {
        setAuthorized(true)
      }
    }
    authCheck();
  }, [router, pathName]);

  return authorized ? children : null;
}
