'use client';

import { usePathname } from "next/navigation";
import { subItems } from "./items";

export function SidebarSub() {
  const pathname = usePathname();
  const submenu = subItems.find(item => item.url === pathname);
  return (
    <>
      {submenu.list}
    </>
  )
}
