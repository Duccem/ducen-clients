'use client'
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function IndexProtect({ children }) {
  const [isServer, setIsServer] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsServer(false);
  }, []);
  if (!isServer && pathName == '/') {
    router.push('/home')
  };

  return children;
}
