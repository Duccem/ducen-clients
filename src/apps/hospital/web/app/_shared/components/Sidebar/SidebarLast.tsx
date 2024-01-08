'use client'
import { SidebarItem } from "./SidebarItem";
import { lastItems } from "./items";

export function SidebarLast() {
  return (
    <>
    {lastItems.map((item, index) => (
        <SidebarItem icon={item.icon} name={item.name} url={item.url} key={index} />
      ))}
    </>
  )
}
