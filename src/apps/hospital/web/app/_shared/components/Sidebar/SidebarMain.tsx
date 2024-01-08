'use client';
import { SidebarItem } from './SidebarItem';
import { items } from './items';

export function SidebarMain() {
  return (
    <>
      {items.map((item, index) => (
        <SidebarItem icon={item.icon} name={item.name} url={item.url} key={index}/>
      ))}
    </>
  );
}
